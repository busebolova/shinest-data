import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const customPath = formData.get("path") as string

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create filename with timestamp to avoid conflicts
    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop()
    const fileName = customPath || `upload-${timestamp}.${fileExtension}`

    // Ensure the public/images directory exists
    const publicDir = join(process.cwd(), "public")
    const imagesDir = join(publicDir, "images")

    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true })
    }

    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true })
    }

    // Write the file
    const filePath = join(imagesDir, fileName)
    await writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = `/images/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: fileName,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
