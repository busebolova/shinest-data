import { githubAPI } from "./github-api"

export type ConnectionStatus = {
  status: "connected" | "connecting" | "disconnected" | "polling" | "error"
  message?: string
  lastUpdate?: Date
  error?: Error
}

class GitHubRealtime {
  private status: ConnectionStatus = { status: "disconnected" }
  private pollingInterval: NodeJS.Timeout | null = null
  private messageListeners: Set<(data: any) => void> = new Set()
  private statusListeners: Set<(status: ConnectionStatus) => void> = new Set()
  private lastSyncTime: Date | null = null

  constructor() {
    // Start polling if in browser environment
    if (typeof window !== "undefined") {
      this.startPolling()
    }
  }

  private startPolling() {
    // Clear any existing interval
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
    }

    // Set status to polling
    this.updateStatus({ status: "polling", message: "Polling for updates..." })

    // Poll every 30 seconds
    this.pollingInterval = setInterval(() => {
      this.checkForUpdates()
    }, 30000)

    // Initial check
    this.checkForUpdates()
  }

  private async checkForUpdates() {
    try {
      // Check if GitHub API is configured
      if (!githubAPI.isConfigured()) {
        this.updateStatus({
          status: "error",
          message: "GitHub API not configured",
          error: new Error("GitHub API not configured"),
        })
        return
      }

      // Get latest commit
      const latestCommit = await githubAPI.getLatestCommit()

      // Update status
      this.updateStatus({
        status: "connected",
        message: `Last commit: ${latestCommit.commit.message.substring(0, 30)}...`,
        lastUpdate: new Date(),
      })

      // Emit heartbeat message
      this.emitMessage({
        type: "heartbeat",
        data: {
          commit: latestCommit.sha.substring(0, 7),
          message: latestCommit.commit.message,
          time: latestCommit.commit.author.date,
        },
      })

      this.lastSyncTime = new Date()
    } catch (error) {
      console.error("Error checking for updates:", error)
      this.updateStatus({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        error: error instanceof Error ? error : new Error("Unknown error"),
      })
    }
  }

  private updateStatus(status: ConnectionStatus) {
    this.status = status
    // Notify all status listeners
    this.statusListeners.forEach((listener) => {
      try {
        listener(this.status)
      } catch (error) {
        console.error("Error in status listener:", error)
      }
    })
  }

  private emitMessage(data: any) {
    // Notify all message listeners
    this.messageListeners.forEach((listener) => {
      try {
        listener(data)
      } catch (error) {
        console.error("Error in message listener:", error)
      }
    })
  }

  // Public API
  getStatus(): ConnectionStatus {
    return { ...this.status }
  }

  onStatusChange(callback: (status: ConnectionStatus) => void): () => void {
    this.statusListeners.add(callback)
    // Immediately call with current status
    callback(this.status)
    // Return unsubscribe function
    return () => {
      this.statusListeners.delete(callback)
    }
  }

  onMessage(callback: (data: any) => void): () => void {
    this.messageListeners.add(callback)
    // Return unsubscribe function
    return () => {
      this.messageListeners.delete(callback)
    }
  }

  async forceSync(): Promise<void> {
    this.updateStatus({ status: "connecting", message: "Syncing..." })

    try {
      // Force sync with API
      const response = await fetch("/api/github/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Sync failed")
      }

      const data = await response.json()

      this.updateStatus({
        status: "connected",
        message: `Synced successfully at ${new Date().toLocaleTimeString()}`,
        lastUpdate: new Date(),
      })

      this.emitMessage({
        type: "sync",
        data,
      })

      this.lastSyncTime = new Date()

      return data
    } catch (error) {
      console.error("Force sync error:", error)
      this.updateStatus({
        status: "error",
        message: error instanceof Error ? error.message : "Sync failed",
        error: error instanceof Error ? error : new Error("Sync failed"),
      })
      throw error
    }
  }

  getLastSyncTime(): Date | null {
    return this.lastSyncTime
  }

  destroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
    }
    this.statusListeners.clear()
    this.messageListeners.clear()
  }
}

// Create singleton instance
export const githubRealtime = new GitHubRealtime()
