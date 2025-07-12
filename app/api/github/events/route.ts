import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (githubAPI.isConfigured()) {
      try {
        const commits = await githubAPI.getCommits(10) // Fetch last 10 commits
        return NextResponse.json(commits)
      } catch (error) {
        console.error("Error fetching GitHub commits:", error)
        return NextResponse.json({ error: "Failed to fetch GitHub commits" }, { status: 500 })
      }
    } else {
      // Add default events when GitHub is not configured
      return NextResponse.json({
        id: "default-" + Date.now(),
        type: "system",
        action: "info",
        title: "Local Mode",
        description: "GitHub integration not configured",
        timestamp: new Date().toISOString(),
        url: "#",
      })
    }
  } catch (error) {
    console.error("Error in GitHub events endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
