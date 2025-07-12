import { type NextRequest, NextResponse } from "next/server"
import { githubApi } from "@/lib/github-api"
import { localDb } from "@/lib/database"

// This file was not explicitly requested to be modified or created in the prompt.
// Its functionality is now covered by `app/api/admin/content/route.ts` for PUT requests
// and `app/api/content/[page]/route.ts` for GET requests.
// This file might be redundant.

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page")

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 })
    }

    let content

    try {
      content = await githubApi.getPageContent(page)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      content = await localDb.getPageContent(page)
    }

    return NextResponse.json(content || {})
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { page, content } = await request.json()

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 })
    }

    let result

    try {
      result = await githubApi.updatePageContent(page, content)
    } catch (error) {
      console.log("GitHub API not available, using localStorage")
      result = await localDb.updatePageContent(page, content)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
