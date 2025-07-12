import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

function verifySignature(payload: string, signature: string) {
  if (!WEBHOOK_SECRET) {
    console.warn("GITHUB_WEBHOOK_SECRET is not set. Webhook signature verification skipped.")
    return true // In development or if not set, skip verification for easier testing
  }

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
            file.startsWith("content/") || // Assuming content files might be here too
            file.includes("projects.json") ||
            file.includes("blog.json") ||
            file.includes("settings.json") ||
            file.includes("pages/"),
        )

      if (contentFiles.length > 0) {
        console.log("Content files modified:", contentFiles)
        // Trigger revalidation
        if (!NEXT_PUBLIC_SITE_URL || !REVALIDATE_TOKEN) {
          console.error("NEXT_PUBLIC_SITE_URL or REVALIDATE_TOKEN not set. Cannot trigger revalidation.")
          return NextResponse.json({ error: "Revalidation not configured" }, { status: 500 })
        }

        await fetch(`${NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${REVALIDATE_TOKEN}`,
          },
          body: JSON.stringify({
            all: true, // Revalidate all common paths for simplicity
            files: contentFiles, // Optional: for logging purposes
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
