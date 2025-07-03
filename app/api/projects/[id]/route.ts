import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// This would be your database in production
const projects = [
  {
    id: "1",
    title: "Modern Living Room",
    description: "Contemporary living space with minimalist design",
    category: "residential",
    images: ["/images/living-room-design-1.png"],
    featured: true,
    year: "2024",
    location: "Istanbul",
    area: "120m²",
    status: "completed",
    tags: ["modern", "minimalist", "living room"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const projectIndex = projects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath(`/projects/${params.id}`)
    revalidatePath("/admin/projects")

    return NextResponse.json({
      success: true,
      project: projects[projectIndex],
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectIndex = projects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects.splice(projectIndex, 1)

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
