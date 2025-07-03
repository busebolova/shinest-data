import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function POST() {
  try {
    console.log("Starting GitHub sync...")

    // Check if GitHub is configured
    if (!githubAPI.isConfigured()) {
      return NextResponse.json(
        {
          error: "GitHub not configured",
          message:
            "Please set GITHUB_TOKEN, NEXT_PUBLIC_GITHUB_OWNER, and NEXT_PUBLIC_GITHUB_REPO environment variables",
        },
        { status: 400 },
      )
    }

    const syncResults = {
      projects: { success: false, count: 0, error: null },
      blogPosts: { success: false, count: 0, error: null },
      pageContent: { success: false, pages: [], error: null },
      lastCommit: null,
    }

    // Sync projects
    try {
      const projects = await githubAPI.getProjects()
      syncResults.projects = { success: true, count: projects.length, error: null }
      console.log(`Synced ${projects.length} projects`)
    } catch (error) {
      console.error("Error syncing projects:", error)
      syncResults.projects.error = error instanceof Error ? error.message : "Unknown error"
    }

    // Sync blog posts
    try {
      const blogPosts = await githubAPI.getBlogPosts()
      syncResults.blogPosts = { success: true, count: blogPosts.length, error: null }
      console.log(`Synced ${blogPosts.length} blog posts`)
    } catch (error) {
      console.error("Error syncing blog posts:", error)
      syncResults.blogPosts.error = error instanceof Error ? error.message : "Unknown error"
    }

    // Sync page content
    try {
      const pages = ["home", "about", "services", "contact"]
      const syncedPages = []

      for (const page of pages) {
        try {
          const content = await githubAPI.getPageContent(page)
          if (content) {
            syncedPages.push(page)
          }
        } catch (error) {
          console.warn(`Could not sync ${page} page:`, error)
        }
      }

      syncResults.pageContent = { success: true, pages: syncedPages, error: null }
      console.log(`Synced ${syncedPages.length} pages: ${syncedPages.join(", ")}`)
    } catch (error) {
      console.error("Error syncing page content:", error)
      syncResults.pageContent.error = error instanceof Error ? error.message : "Unknown error"
    }

    // Get latest commit info
    try {
      const latestCommit = await githubAPI.getLatestCommit()
      syncResults.lastCommit = {
        sha: latestCommit.sha.substring(0, 7),
        message: latestCommit.commit.message,
        author: latestCommit.commit.author.name,
        date: latestCommit.commit.author.date,
        url: latestCommit.html_url,
      }
    } catch (error) {
      console.error("Error getting latest commit:", error)
    }

    console.log("GitHub sync completed:", syncResults)

    return NextResponse.json({
      success: true,
      message: "GitHub sync completed successfully",
      timestamp: new Date().toISOString(),
      results: syncResults,
    })
  } catch (error) {
    console.error("GitHub sync error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Sync failed",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
