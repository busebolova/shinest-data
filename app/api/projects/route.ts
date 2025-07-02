import { type NextRequest, NextResponse } from "next/server"
import { getGitHubApi } from "@/lib/github-api"

export async function GET() {
  try {
    const github = getGitHubApi()
    const projects = await github.getProjects()

    return NextResponse.json({
      success: true,
      projects: projects || [],
    })
  } catch (error) {
    console.error("Projects API error:", error)

    // Fallback data
    const fallbackProjects = [
      {
        id: "1",
        title: { tr: "Modern Banyo Tasarımı", en: "Modern Bathroom Design" },
        category: "Banyo",
        location: "İzmir",
        year: 2024,
        images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
        description: { tr: "Modern ve şık banyo tasarımı", en: "Modern and elegant bathroom design" },
        status: "published",
        featured: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        title: { tr: "Kafe İç Mekan Tasarımı", en: "Cafe Interior Design" },
        category: "Ticari",
        location: "İstanbul",
        year: 2024,
        images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
        description: { tr: "Sıcak ve davetkar kafe tasarımı", en: "Warm and inviting cafe design" },
        status: "published",
        featured: false,
        createdAt: "2024-01-02T00:00:00.000Z",
        updatedAt: "2024-01-02T00:00:00.000Z",
      },
      {
        id: "3",
        title: { tr: "Kış Bahçesi Tasarımı", en: "Winter Garden Design" },
        category: "Konut",
        location: "Ankara",
        year: 2024,
        images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
        description: { tr: "Doğayla iç içe kış bahçesi", en: "Winter garden integrated with nature" },
        status: "published",
        featured: true,
        createdAt: "2024-01-03T00:00:00.000Z",
        updatedAt: "2024-01-03T00:00:00.000Z",
      },
      {
        id: "4",
        title: { tr: "Yatak Odası Tasarımı", en: "Bedroom Design" },
        category: "Konut",
        location: "İzmir",
        year: 2024,
        images: ["/images/bedroom-design-1.png", "/images/bedroom-design-2.png"],
        description: { tr: "Rahat ve huzurlu yatak odası", en: "Comfortable and peaceful bedroom" },
        status: "draft",
        featured: false,
        createdAt: "2024-01-04T00:00:00.000Z",
        updatedAt: "2024-01-04T00:00:00.000Z",
      },
    ]

    return NextResponse.json({
      success: true,
      projects: fallbackProjects,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const project = await request.json()
    const github = getGitHubApi()

    const newProject = {
      id: Date.now().toString(),
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await github.createProject(newProject)

    return NextResponse.json({
      success: true,
      project: newProject,
    })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ success: false, error: "Proje oluşturulamadı" }, { status: 500 })
  }
}
