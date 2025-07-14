import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 })
    }

    revalidatePath(path)

    return NextResponse.json({
      success: true,
      message: `Revalidated ${path}`,
    })
  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
