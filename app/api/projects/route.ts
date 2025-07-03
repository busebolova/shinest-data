import { type NextRequest, NextResponse } from "next/server"
import { githubApi } from "@/lib/github-api"
import { localDb } from "@/lib/database"

export async function GET() {
  try {
    // Try GitHub first, fallback to localStorage
    let projects = []

    try {
      projects = await githubApi.getProjects()
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      projects = await localDb.getProjects()
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()

    let newProject

    try {
      newProject = await githubApi.createProject(projectData)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      newProject = await localDb.createProject(projectData)
    }

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
