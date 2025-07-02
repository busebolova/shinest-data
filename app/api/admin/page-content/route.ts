import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const patchSchema = z.object({
  page: z.string(),
  content: z.string(),
})

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const { page, content } = patchSchema.parse(body)

    const pageContent = await prisma.pageContent.upsert({
      where: {
        page: page,
      },
      update: {
        content: content,
      },
      create: {
        page: page,
        content: content,
      },
    })

    return NextResponse.json(pageContent)
  } catch (error) {
    console.error("[PAGE_CONTENT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
