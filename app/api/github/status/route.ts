import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const isConfigured = githubAPI.isConfigured()

    if (!isConfigured) {
      // Return mock data for development
      return NextResponse.json({
        configured: false,
        repository: {
          name: "shinest-mock",
          full_name: "shinest/shinest-mock",
          html_url: "https://github.com/shinest/shinest",
          updated_at: new Date().toISOString(),
        },
        lastCommit: {
          sha: "mock-" + Date.now(),
          commit: {
            author: {
              name: "Development",
              email: "dev@shinest.com",
              date: new Date().toISOString(),
            },
            message: "Development mode - mock commit",
          },
          html_url: "https://github.com/shinest/shinest",
        },
        stats: {
          projects: 2,
          blogPosts: 1,
          commits: 1,
        },
      })
    }

    // Get real data from GitHub
    const [repository, commits, projects, blogPosts] = await Promise.allSettled([
      githubAPI.getRepositoryInfo(),
      githubAPI.getCommits(1),
      githubAPI.getProjects(),
      githubAPI.getBlogPosts(),
    ])

    const repoData =
      repository.status === "fulfilled"
        ? repository.value
        : {
            name: "shinest",
            full_name: "shinest/shinest",
            html_url: "https://github.com/shinest/shinest",
            updated_at: new Date().toISOString(),
          }

    const latestCommit =
      commits.status === "fulfilled" && commits.value.length > 0
        ? commits.value[0]
        : {
            sha: "default-" + Date.now(),
            commit: {
              author: {
                name: "System",
                email: "system@shinest.com",
                date: new Date().toISOString(),
              },
              message: "Default commit",
            },
            html_url: repoData.html_url,
          }

    const projectsData = projects.status === "fulfilled" ? projects.value : []
    const blogData = blogPosts.status === "fulfilled" ? blogPosts.value : []

    return NextResponse.json({
      configured: true,
      repository: repoData,
      lastCommit: latestCommit,
      stats: {
        projects: projectsData.length,
        blogPosts: blogData.length,
        commits: commits.status === "fulfilled" ? commits.value.length : 1,
      },
    })
  } catch (error) {
    console.error("GitHub status check failed:", error)

    // Return fallback data instead of error
    return NextResponse.json({
      configured: false,
      repository: {
        name: "shinest-fallback",
        full_name: "shinest/shinest-fallback",
        html_url: "https://github.com/shinest/shinest",
        updated_at: new Date().toISOString(),
      },
      lastCommit: {
        sha: "fallback-" + Date.now(),
        commit: {
          author: {
            name: "Fallback",
            email: "fallback@shinest.com",
            date: new Date().toISOString(),
          },
          message: "Fallback mode active",
        },
        html_url: "https://github.com/shinest/shinest",
      },
      stats: {
        projects: 0,
        blogPosts: 0,
        commits: 0,
      },
    })
  }
}
