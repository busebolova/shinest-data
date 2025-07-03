import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const projects = await githubAPI.getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Projects fetch failed:", error)
    return NextResponse.json(
      {
        error: "Projeler alınamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const projectData = await request.json()
    const newProject = await githubAPI.createProject(projectData)
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Project creation failed:", error)
    return NextResponse.json(
      {
        error: "Proje oluşturulamadı",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
