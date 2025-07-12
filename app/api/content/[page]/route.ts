import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"
import { revalidatePath } from "next/cache"

export async function GET(request: Request, { params }: { params: { page: string } }) {
  try {
    const { page } = params
    const content = await dataManager.getPageContent(page)
    return NextResponse.json(content)
  } catch (error) {
    console.error(`Error fetching content for ${params.page}:`, error)
    return NextResponse.json({})
  }
}

export async function POST(request: Request, { params }: { params: { page: string } }) {
  try {
    const { page } = params
    const content = await request.json()

    await dataManager.savePageContent(page, content)

    // Revalidate the specific page and admin page
    revalidatePath(`/${page === "home" ? "" : page}`)
    revalidatePath(`/admin/content/${page}`)

    return NextResponse.json({
      success: true,
      message: `${page} sayfası içeriği başarıyla güncellendi`,
    })
  } catch (error) {
    console.error(`Error updating content for ${params.page}:`, error)
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
