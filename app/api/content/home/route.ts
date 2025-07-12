import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    const content = await dataManager.getPageContent("home")
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching home page content:", error)
    return NextResponse.json({ error: "Failed to fetch home page content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json()
    await dataManager.savePageContent("home", content)

    // Revalidate home page and admin page
    revalidatePath("/")
    revalidatePath("/admin/content/home")

    return NextResponse.json({
      success: true,
      message: "Ana sayfa içeriği başarıyla güncellendi",
    })
  } catch (error) {
    console.error("Error updating home content:", error)
    return NextResponse.json(
      {
        success: false,
        message: "İçerik güncellenirken hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
