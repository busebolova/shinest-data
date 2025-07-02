import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { paths } = await request.json()

    if (Array.isArray(paths)) {
      paths.forEach((path: string) => {
        revalidatePath(path)
      })
    } else if (typeof paths === "string") {
      revalidatePath(paths)
    }

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
