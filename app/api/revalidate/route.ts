import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path } = body

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Revalidate common paths
    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin")

    return NextResponse.json({ revalidated: true, paths: ["/", "/projects", "/admin"] })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
