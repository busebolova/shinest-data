import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET

function verifySignature(payload: string, signature: string) {
  if (!WEBHOOK_SECRET) return false

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET)
  const digest = "sha256=" + hmac.update(payload).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-hub-signature-256")

    if (!signature || !verifySignature(payload, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(payload)

    // Handle different webhook events
    if (data.ref === "refs/heads/main" && data.commits) {
      // Check if any commits modified content files
      const contentFiles = data.commits
        .flatMap((commit: any) => [...commit.modified, ...commit.added, ...commit.removed])
        .filter(
          (file: string) =>
            file.startsWith("data/") ||
            file.startsWith("content/") ||
            file.includes("projects.json") ||
            file.includes("pages/"),
        )

      if (contentFiles.length > 0) {
        // Trigger revalidation
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
          },
          body: JSON.stringify({
            paths: ["/", "/projects", "/about", "/blog"],
            files: contentFiles,
          }),
        })

        console.log("Content updated, revalidation triggered")
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
