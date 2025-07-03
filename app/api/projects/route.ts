import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// In-memory storage for demo (in production, use database)
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
  {
    id: "2",
    title: "Luxury Hotel Lobby",
    description: "Elegant hotel lobby with premium finishes",
    category: "hospitality",
    images: ["/images/cafe-design-1.png"],
    featured: false,
    year: "2024",
    location: "Ankara",
    area: "300m²",
    status: "in-progress",
    tags: ["luxury", "hotel", "lobby"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newProject = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    projects.push(newProject)

    // Revalidate the projects page
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return NextResponse.json({
      success: true,
      project: newProject,
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
