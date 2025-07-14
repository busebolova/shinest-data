import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const events = []

    if (githubAPI.isConfigured()) {
      try {
        const commits = await githubAPI.getCommits(10)
        events.push(
          ...commits.map((commit) => ({
            id: commit.sha,
            type: "commit",
            action: "committed",
            title: commit.commit.message.split("\n")[0],
            description: `by ${commit.commit.author.name}`,
            timestamp: commit.commit.author.date,
            url: commit.html_url,
          })),
        )
      } catch (error) {
        console.error("Error fetching GitHub commits:", error)
        // Add fallback event
        events.push({
          id: "fallback-" + Date.now(),
          type: "system",
          action: "update",
          title: "System Status",
          description: "Running in local mode",
          timestamp: new Date().toISOString(),
          url: "#",
        })
      }
    } else {
      // Add default events when GitHub is not configured
      events.push({
        id: "default-" + Date.now(),
        type: "system",
        action: "info",
        title: "Local Mode",
        description: "GitHub integration not configured",
        timestamp: new Date().toISOString(),
        url: "#",
      })
    }

    return NextResponse.json(events)
  } catch (error) {
    console.error("Error in GitHub events endpoint:", error)
    return NextResponse.json([])
  }
}
