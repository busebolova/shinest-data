import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function GET() {
  try {
    const projects = await dataManager.getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const projectData = await request.json()
    const newProject = await dataManager.createProject(projectData)
    return NextResponse.json(newProject)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
