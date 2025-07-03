import { type NextRequest, NextResponse } from "next/server"
import { githubApi } from "@/lib/github-api"
import { localDb } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    let project

    try {
      const projects = await githubApi.getProjects()
      project = projects.find((p: any) => p.id === id)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      project = await localDb.findById("projects", id)
    }

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
    const { id } = params
    const updates = await request.json()

    let updatedProject

    try {
      updatedProject = await githubApi.updateProject(id, updates)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      updatedProject = await localDb.updateProject(id, updates)
    }

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    let success

    try {
      success = await githubApi.deleteProject(id)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      success = await localDb.deleteProject(id)
    }

    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
