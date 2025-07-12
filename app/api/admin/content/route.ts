import { type NextRequest, NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

export async function PUT(request: NextRequest) {
  try {
    const { page, content } = await request.json() // Expecting { page: string, content: any }

    if (!page || !content) {
      return NextResponse.json({ error: "Page and content are required" }, { status: 400 })
    }

    await dataManager.savePageContent(page, content)

    // Trigger revalidation for the specific page
    const revalidatePath = page === "home" ? "/" : `/${page}`
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify({ path: revalidatePath }),
    })

    return NextResponse.json({ success: true, message: "Page content updated successfully" })
  } catch (error) {
    console.error("Error updating page content:", error)
    return NextResponse.json({ success: false, error: "Failed to update page content" }, { status: 500 })
  }
}
