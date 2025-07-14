import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function POST() {
  try {
    console.log("Starting GitHub sync...")

    // Get all data to ensure it's available
    const projects = await githubAPI.getProjects()
    const blogPosts = await githubAPI.getBlogPosts()
    const commits = await githubAPI.getCommits(10)

    // Get repository info
    let repository
    try {
      repository = await githubAPI.getRepositoryInfo()
    } catch (error) {
      repository = {
        name: "shinest",
        full_name: "shinest/shinest",
        html_url: "https://github.com/shinest/shinest",
        updated_at: new Date().toISOString(),
      }
    }

    const syncData = {
      timestamp: new Date().toISOString(),
      repository,
      stats: {
        projects: projects.length,
        blogPosts: blogPosts.length,
        commits: commits.length,
      },
      success: true,
      message: "Sync completed successfully",
    }

    console.log("GitHub sync completed:", syncData)

    return NextResponse.json(syncData)
  } catch (error) {
    console.error("GitHub sync failed:", error)

    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        success: false,
        error: "Sync failed",
        message: error instanceof Error ? error.message : "Unknown error",
        stats: {
          projects: 0,
          blogPosts: 0,
          commits: 0,
        },
      },
      { status: 200 }, // Return 200 to avoid breaking the UI
    )
  }
}
