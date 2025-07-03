import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ error: "Path required" }, { status: 400 })
    }

    revalidatePath(path)
    return NextResponse.json({ revalidated: true })
  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
