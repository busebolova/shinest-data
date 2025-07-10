import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // GitHub'dan projeleri çek
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 60 },
          },
        )

        if (response.ok) {
          const data = await response.json()
          const content = Buffer.from(data.content, "base64").toString("utf-8")
          const projects = JSON.parse(content)
          const project = projects.projects?.find((p: any) => p.id === id)

          if (project) {
            return NextResponse.json({ project })
          }
        }
      } catch (error) {
        console.error("GitHub API error:", error)
      }
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

    // GitHub'dan projeleri al ve güncelle
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      try {
        const getResponse = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        )

        if (getResponse.ok) {
          const data = await getResponse.json()
          const content = Buffer.from(data.content, "base64").toString("utf-8")
          const projects = JSON.parse(content)
          const projectIndex = projects.projects?.findIndex((p: any) => p.id === id)

          if (projectIndex !== -1) {
            // Projeyi güncelle
            projects.projects[projectIndex] = {
              ...projects.projects[projectIndex],
              ...updates,
              updatedAt: new Date().toISOString(),
            }

            const newContent = JSON.stringify(projects, null, 2)

            // GitHub'a kaydet
            const updateResponse = await fetch(
              `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
              {
                method: "PUT",
                headers: {
                  Authorization: `token ${process.env.GITHUB_TOKEN}`,
                  Accept: "application/vnd.github.v3+json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: `Update project: ${projects.projects[projectIndex].title.tr}`,
                  content: Buffer.from(newContent).toString("base64"),
                  sha: data.sha,
                }),
              },
            )

            if (updateResponse.ok) {
              // Cache'i temizle
              revalidatePath("/projects")
              revalidatePath("/api/projects")
              return NextResponse.json({ success: true, project: projects.projects[projectIndex] })
            }
          }
        }
      } catch (error) {
        console.error("GitHub update error:", error)
      }
    }

    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  } catch (error) {
    console.error("Update project error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // GitHub'dan projeleri al ve sil
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      try {
        const getResponse = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        )

        if (getResponse.ok) {
          const data = await getResponse.json()
          const content = Buffer.from(data.content, "base64").toString("utf-8")
          const projects = JSON.parse(content)
          const projectToDelete = projects.projects?.find((p: any) => p.id === id)

          if (projectToDelete) {
            // Projeyi sil
            projects.projects = projects.projects.filter((p: any) => p.id !== id)

            const newContent = JSON.stringify(projects, null, 2)

            // GitHub'a kaydet
            const updateResponse = await fetch(
              `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/data/projects.json`,
              {
                method: "PUT",
                headers: {
                  Authorization: `token ${process.env.GITHUB_TOKEN}`,
                  Accept: "application/vnd.github.v3+json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: `Delete project: ${projectToDelete.title.tr}`,
                  content: Buffer.from(newContent).toString("base64"),
                  sha: data.sha,
                }),
              },
            )

            if (updateResponse.ok) {
              // Cache'i temizle
              revalidatePath("/projects")
              revalidatePath("/api/projects")
              return NextResponse.json({ success: true })
            }
          }
        }
      } catch (error) {
        console.error("GitHub delete error:", error)
      }
    }

    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
  } catch (error) {
    console.error("Delete project error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
