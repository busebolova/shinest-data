import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    if (!githubAPI.isConfigured()) {
      return NextResponse.json(
        {
          error: "GitHub not configured",
          hasUpdates: false,
          updates: [],
        },
        { status: 400 },
      )
    }

    // Get latest commit to check for updates
    const latestCommit = await githubAPI.getLatestCommit()

    // Check if there are any recent updates (within last 5 minutes)
    const commitDate = new Date(latestCommit.commit.author.date)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const hasRecentUpdates = commitDate > fiveMinutesAgo

    const updates = hasRecentUpdates
      ? [
          {
            type: "general",
            action: "update",
            data: {
              commit: {
                sha: latestCommit.sha.substring(0, 7),
                message: latestCommit.commit.message,
                author: latestCommit.commit.author.name,
                date: latestCommit.commit.author.date,
              },
            },
            timestamp: latestCommit.commit.author.date,
          },
        ]
      : []

    return NextResponse.json({
      success: true,
      hasUpdates: hasRecentUpdates,
      updates,
      lastCommit: {
        sha: latestCommit.sha.substring(0, 7),
        message: latestCommit.commit.message,
        author: latestCommit.commit.author.name,
        date: latestCommit.commit.author.date,
        url: latestCommit.html_url,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("GitHub status error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check GitHub status",
        hasUpdates: false,
        updates: [],
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
