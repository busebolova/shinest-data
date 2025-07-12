import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: Request) {
  try {
    const { path, tag, all } = await request.json()
    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    if (path) {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    }

    if (tag) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    if (all) {
      // Revalidate all common pages
      revalidatePath("/")
      revalidatePath("/projects")
      revalidatePath("/blog")
      revalidatePath("/about")
      revalidatePath("/services")
      revalidatePath("/contact")
      revalidatePath("/admin/dashboard") // Revalidate admin dashboard as well
      console.log("Revalidated all common paths.")
    }

    return NextResponse.json({
      success: true,
      message: "Cache başarıyla temizlendi",
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Cache temizlenirken hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
