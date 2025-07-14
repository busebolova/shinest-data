import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { dataManager } from "@/lib/data-manager"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const project = await dataManager.getProject(id)

    if (project) {
      return NextResponse.json({ project })
    }
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  } catch (error) {
    console.error("Get project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updates = await request.json()

    const updatedProject = await dataManager.updateProject(id, updates)

    // Revalidate paths to show updates immediately
    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath(`/projects/${updatedProject.slug}`)
    revalidatePath("/api/projects")
    revalidatePath(`/api/projects/${id}`)

    return NextResponse.json({ success: true, project: updatedProject })
  } catch (error) {
    console.error("Update project error:", error)
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const projectToDelete = await dataManager.getProject(id)

    if (!projectToDelete) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    await dataManager.deleteProject(id)

    // Revalidate paths after deletion
    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath(`/projects/${projectToDelete.slug}`)
    revalidatePath("/api/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete project error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
