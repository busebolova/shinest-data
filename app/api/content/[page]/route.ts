import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET(request: Request, { params }: { params: { page: string } }) {
  try {
    const content = await githubAPI.getPageContent(params.page)
    return NextResponse.json(content || {})
  } catch (error) {
    console.error(`Page content fetch failed for ${params.page}:`, error)
    return NextResponse.json(
      {
        error: "Sayfa içeriği alınamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: { params: { page: string } }) {
  try {
    const content = await request.json()
    await githubAPI.savePageContent(params.page, content)
    return NextResponse.json({ success: true, message: "İçerik kaydedildi" })
  } catch (error) {
    console.error(`Page content save failed for ${params.page}:`, error)
    return NextResponse.json(
      {
        error: "İçerik kaydedilemedi",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
