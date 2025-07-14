import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    if (!githubAPI.isConfigured()) {
      return NextResponse.json({
        connected: false,
        error: "GitHub API not configured",
      })
    }

    const repoInfo = await githubAPI.getRepositoryInfo()
    const latestCommit = await githubAPI.getLatestCommit()

    return NextResponse.json({
      connected: true,
      repository: repoInfo,
      latestCommit,
      lastCheck: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
