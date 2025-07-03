import { NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page")

    if (!page) {
      return NextResponse.json({ error: "Page parameter required" }, { status: 400 })
    }

    const content = await db.getPageContent(page)
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { page, content } = await request.json()

    if (!page || !content) {
      return NextResponse.json({ error: "Page and content required" }, { status: 400 })
    }

    const savedContent = await db.savePageContent(page, content)
    return NextResponse.json(savedContent)
  } catch (error) {
    console.error("Error saving content:", error)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
