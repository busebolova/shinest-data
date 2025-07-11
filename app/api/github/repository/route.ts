import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const repository = await githubAPI.getRepositoryInfo()
    return NextResponse.json(repository)
  } catch (error) {
    console.error("Error fetching repository info:", error)
    return NextResponse.json({
      name: "shinest-content",
      full_name: "shinest-architecture/shinest-content",
      html_url: "https://github.com/shinest-architecture/shinest-content",
      updated_at: new Date().toISOString(),
      private: false,
      default_branch: "main",
    })
  }
}
