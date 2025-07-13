import { githubAPI } from "./github-api"

interface RealtimeConnection {
  isConnected: boolean
  lastSync: Date | null
  error: string | null
}

class GitHubRealtime {
  private connection: RealtimeConnection = {
    isConnected: false,
    lastSync: null,
    error: null,
  }

  private listeners: Set<(connection: RealtimeConnection) => void> = new Set()
  private syncInterval: NodeJS.Timeout | null = null

  constructor() {
    this.startSync()
  }

  // Start periodic sync
  private startSync() {
    // Sync every 30 seconds
    this.syncInterval = setInterval(() => {
      this.checkConnection()
    }, 30000)

    // Initial check
    this.checkConnection()
  }

  // Check GitHub connection
  private async checkConnection() {
    try {
      if (githubAPI.isConfigured()) {
        await githubAPI.getRepositoryInfo()
        this.updateConnection({
          isConnected: true,
          lastSync: new Date(),
          error: null,
        })
      } else {
        this.updateConnection({
          isConnected: false,
          lastSync: null,
          error: "GitHub API not configured",
        })
      }
    } catch (error) {
      this.updateConnection({
        isConnected: false,
        lastSync: this.connection.lastSync,
        error: error instanceof Error ? error.message : "Connection failed",
      })
    }
  }

  // Update connection status
  private updateConnection(newConnection: RealtimeConnection) {
    this.connection = newConnection
    this.notifyListeners()
  }

  // Notify all listeners
  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.connection)
      } catch (error) {
        console.error("Error in realtime listener:", error)
      }
    })
  }

  // Subscribe to connection changes
  subscribe(listener: (connection: RealtimeConnection) => void) {
    this.listeners.add(listener)

    // Immediately call with current state
    listener(this.connection)

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  // Get current connection status
  getConnection(): RealtimeConnection {
    return { ...this.connection }
  }

  // Manual sync
  async sync(): Promise<void> {
    await this.checkConnection()
  }

  // Cleanup
  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
    this.listeners.clear()
  }
}

// Create singleton instance
export const githubRealtime = new GitHubRealtime()

// Export types
export type { RealtimeConnection }
