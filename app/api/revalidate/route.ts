import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: Request) {
  try {
    const { path, tag, all } = await request.json()

    if (path) {
      revalidatePath(path)
    }

    if (tag) {
      revalidateTag(tag)
    }

    if (all) {
      // Revalidate all common pages
      revalidatePath("/")
      revalidatePath("/projects")
      revalidatePath("/blog")
      revalidatePath("/about")
      revalidatePath("/services")
      revalidatePath("/contact")
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
