"use client"

import { useState, useEffect } from "react"
import { githubRealtime, type RealtimeConnection } from "@/lib/github-realtime"

export function useRealtimeContent() {
  const [connection, setConnection] = useState<RealtimeConnection>({
    isConnected: false,
    lastSync: null,
    error: null,
  })

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe(setConnection)
    return unsubscribe
  }, [])

  const sync = async () => {
    await githubRealtime.sync()
  }

  return {
    connection,
    sync,
    isConnected: connection.isConnected,
    lastSync: connection.lastSync,
    error: connection.error,
  }
}
