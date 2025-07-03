import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await githubAPI.getProject(params.id)
    if (!project) {
      return NextResponse.json({ error: "Proje bulunamadı" }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error("Project fetch failed:", error)
    return NextResponse.json(
      {
        error: "Proje alınamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const updatedProject = await githubAPI.updateProject(params.id, updateData)
    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Project update failed:", error)
    return NextResponse.json(
      {
        error: "Proje güncellenemedi",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await githubAPI.deleteProject(params.id)
    return NextResponse.json({ success: true, message: "Proje silindi" })
  } catch (error) {
    console.error("Project deletion failed:", error)
    return NextResponse.json(
      {
        error: "Proje silinemedi",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
