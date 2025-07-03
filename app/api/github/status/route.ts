import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    // Check if GitHub is configured
    if (!githubAPI.isConfigured()) {
      return NextResponse.json({
        status: "not_configured",
        message: "GitHub API not configured",
        configured: false,
        timestamp: new Date().toISOString(),
      })
    }

    // Get repository info
    const repoInfo = await githubAPI.getRepositoryInfo()
    const latestCommit = await githubAPI.getLatestCommit()

    return NextResponse.json({
      status: "connected",
      message: "GitHub API is working",
      configured: true,
      repository: {
        name: repoInfo.name,
        fullName: repoInfo.full_name,
        private: repoInfo.private,
        defaultBranch: repoInfo.default_branch,
        updatedAt: repoInfo.updated_at,
      },
      latestCommit: {
        sha: latestCommit.sha.substring(0, 7),
        message: latestCommit.commit.message,
        author: latestCommit.commit.author.name,
        date: latestCommit.commit.author.date,
        url: latestCommit.html_url,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("GitHub status check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        configured: githubAPI.isConfigured(),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
