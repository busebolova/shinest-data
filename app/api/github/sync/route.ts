import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function POST() {
  try {
    if (!githubAPI.isConfigured()) {
      return NextResponse.json({
        success: false,
        message: "GitHub API not configured",
      })
    }

    const [projects, blogPosts, latestCommit] = await Promise.all([
      githubAPI.getProjects(),
      githubAPI.getBlogPosts(),
      githubAPI.getLatestCommit(),
    ])

    return NextResponse.json({
      success: true,
      message: "Sync completed successfully",
      data: {
        projects: projects.length,
        blogPosts: blogPosts.length,
        lastCommit: {
          sha: latestCommit.sha.substring(0, 7),
          message: latestCommit.commit.message,
          author: latestCommit.commit.author.name,
          date: latestCommit.commit.author.date,
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("GitHub sync error:", error)
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Sync failed",
      timestamp: new Date().toISOString(),
    })
  }
}
