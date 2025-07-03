import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    if (!githubAPI.isConfigured()) {
      return NextResponse.json({
        status: "error",
        message: "GitHub API not configured",
        hasUpdates: false,
        updates: [],
      })
    }

    const latestCommit = await githubAPI.getLatestCommit()
    const repoInfo = await githubAPI.getRepositoryInfo()

    return NextResponse.json({
      status: "connected",
      message: "GitHub connection active",
      hasUpdates: false,
      updates: [],
      lastCommit: {
        sha: latestCommit.sha.substring(0, 7),
        message: latestCommit.commit.message,
        author: latestCommit.commit.author.name,
        date: latestCommit.commit.author.date,
      },
      repository: {
        name: repoInfo.name,
        fullName: repoInfo.full_name,
        updatedAt: repoInfo.updated_at,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("GitHub status error:", error)
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      hasUpdates: false,
      updates: [],
      timestamp: new Date().toISOString(),
    })
  }
}
