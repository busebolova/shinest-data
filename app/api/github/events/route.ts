import type { NextRequest } from "next/server"
import { githubAPI } from "@/lib/github-api"

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const data = `data: ${JSON.stringify({
        type: "connected",
        message: "GitHub events stream connected",
        timestamp: new Date().toISOString(),
      })}\n\n`
      controller.enqueue(encoder.encode(data))

      // Send heartbeat every 30 seconds
      const heartbeatInterval = setInterval(() => {
        try {
          const heartbeat = `data: ${JSON.stringify({
            type: "heartbeat",
            timestamp: new Date().toISOString(),
          })}\n\n`
          controller.enqueue(encoder.encode(heartbeat))
        } catch (error) {
          console.error("Heartbeat error:", error)
          clearInterval(heartbeatInterval)
          controller.close()
        }
      }, 30000)

      // Check for GitHub updates every 60 seconds
      const updateInterval = setInterval(async () => {
        try {
          if (githubAPI.isConfigured()) {
            const latestCommit = await githubAPI.getLatestCommit()
            const updateData = `data: ${JSON.stringify({
              type: "update",
              commit: {
                sha: latestCommit.sha.substring(0, 7),
                message: latestCommit.commit.message,
                author: latestCommit.commit.author.name,
                date: latestCommit.commit.author.date,
              },
              timestamp: new Date().toISOString(),
            })}\n\n`
            controller.enqueue(encoder.encode(updateData))
          }
        } catch (error) {
          console.error("Update check error:", error)
          const errorData = `data: ${JSON.stringify({
            type: "error",
            message: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          })}\n\n`
          controller.enqueue(encoder.encode(errorData))
        }
      }, 60000)

      // Cleanup on close
      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeatInterval)
        clearInterval(updateInterval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  })
}
