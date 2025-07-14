import { NextResponse, type NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import { dataManager } from "@/lib/data-manager"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  try {
    const headers = {
      "Cache-Control": "no-store, max-age=0",
    }
    const projects = await dataManager.getProjects()

    if (slug) {
      const project = projects.find((p: any) => p.slug === slug)
      if (project) {
        return NextResponse.json({ project }, { headers })
      } else {
        return NextResponse.json({ error: "Project not found" }, { status: 404, headers })
      }
    }

    return NextResponse.json({ projects }, { headers })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create project using the data manager
    const newProject = await dataManager.createProject(body)

    // Revalidate paths to show the new project immediately
    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/api/projects")

    return NextResponse.json({ success: true, project: newProject }, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
