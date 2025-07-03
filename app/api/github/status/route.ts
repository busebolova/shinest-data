import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const isConfigured = githubAPI.isConfigured()

    if (!isConfigured) {
      return NextResponse.json(
        {
          error: "GitHub API not configured",
          configured: false,
          repository: {
            name: "shinest",
            fullName: "shinest/shinest",
            url: "https://github.com/shinest/shinest",
            updatedAt: new Date().toISOString(),
          },
          lastCommit: {
            sha: "local",
            message: "Local development",
            author: "System",
            date: new Date().toISOString(),
            url: "https://github.com/shinest/shinest",
          },
          stats: {
            projects: 2,
            blogPosts: 1,
            commits: 1,
            lastUpdate: new Date().toISOString(),
          },
        },
        { status: 200 },
      )
    }

    // Get repository info (with fallback)
    let repository
    try {
      repository = await githubAPI.getRepositoryInfo()
    } catch (error) {
      console.log("Using fallback repository info")
      repository = {
        name: "shinest",
        full_name: "shinest/shinest",
        html_url: "https://github.com/shinest/shinest",
        updated_at: new Date().toISOString(),
      }
    }

    // Get latest commit (with fallback)
    let lastCommit
    try {
      lastCommit = await githubAPI.getLatestCommit()
    } catch (error) {
      console.log("Using fallback commit info")
      lastCommit = {
        sha: "fallback",
        commit: {
          message: "Fallback commit",
          author: {
            name: "System",
            date: new Date().toISOString(),
          },
        },
        html_url: "https://github.com/shinest/shinest",
      }
    }

    // Get content stats (with fallbacks)
    const projects = await githubAPI.getProjects()
    const blogPosts = await githubAPI.getBlogPosts()
    const commits = await githubAPI.getCommits(10)

    const stats = {
      projects: projects.length,
      blogPosts: blogPosts.length,
      commits: commits.length,
      lastUpdate: new Date().toISOString(),
    }

    return NextResponse.json({
      configured: true,
      repository: {
        name: repository.name,
        fullName: repository.full_name,
        url: repository.html_url,
        updatedAt: repository.updated_at,
      },
      lastCommit: {
        sha: lastCommit.sha,
        message: lastCommit.commit.message,
        author: lastCommit.commit.author.name,
        date: lastCommit.commit.author.date,
        url: lastCommit.html_url,
      },
      stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("GitHub status check failed:", error)

    // Return fallback data instead of error
    return NextResponse.json(
      {
        error: "GitHub API temporarily unavailable",
        message: "Using local fallback data",
        configured: false,
        repository: {
          name: "shinest",
          fullName: "shinest/shinest",
          url: "https://github.com/shinest/shinest",
          updatedAt: new Date().toISOString(),
        },
        lastCommit: {
          sha: "local",
          message: "Local development mode",
          author: "System",
          date: new Date().toISOString(),
          url: "https://github.com/shinest/shinest",
        },
        stats: {
          projects: 2,
          blogPosts: 1,
          commits: 1,
          lastUpdate: new Date().toISOString(),
        },
      },
      { status: 200 },
    )
  }
}
