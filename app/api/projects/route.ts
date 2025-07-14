import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const projects = await githubAPI.getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Projects fetch failed:", error)

    // Return default projects on error
    const defaultProjects = [
      {
        id: "1",
        title: "Modern Yaşam Alanı",
        description: "Minimalist tasarım anlayışıyla modern yaşam alanı",
        category: "Residential",
        images: ["/images/living-room-design-1.png"],
        featured: true,
        year: "2024",
        location: "İstanbul",
        area: "120m²",
        status: "completed",
        tags: ["modern", "minimalist"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json(defaultProjects)
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
