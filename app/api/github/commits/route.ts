import { NextResponse } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET() {
  try {
    const commits = await githubAPI.getCommits(10)
    return NextResponse.json(commits)
  } catch (error) {
    console.error("Error fetching commits:", error)
    return NextResponse.json([], { status: 200 })
  }
}
