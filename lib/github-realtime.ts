interface RealtimeConnection {
  isConnected: boolean
  lastUpdate: Date | null
  reconnectAttempts: number
  maxReconnectAttempts: number
  lastCommitSha: string | null
}

interface ConnectionStatus {
  status: "connecting" | "connected" | "disconnected" | "error" | "polling"
  message?: string
  attempts?: number
  lastUpdate?: Date
}

interface ContentUpdate {
  type: string
  action: "create" | "update" | "delete"
  data: any
  timestamp: Date
}

class GitHubRealtime {
  private connection: RealtimeConnection = {
    isConnected: false,
    lastUpdate: null,
    reconnectAttempts: 0,
    maxReconnectAttempts: 3,
    lastCommitSha: null,
  }

  private listeners: Map<string, Set<(data: ContentUpdate) => void>> = new Map()
  private statusListeners: Set<(status: ConnectionStatus) => void> = new Set()
  private messageListeners: Set<(data: any) => void> = new Set()
  private pollingInterval: NodeJS.Timeout | null = null
  private connectionTimeout: NodeJS.Timeout | null = null

  constructor() {
    if (typeof window !== "undefined") {
      // Start connection after a short delay
      setTimeout(() => {
        this.connect()
      }, 2000)
    }
  }

  private updateStatus(status: ConnectionStatus) {
    console.log("GitHub Realtime Status:", status)
    this.statusListeners.forEach((listener) => {
      try {
        listener(status)
      } catch (error) {
        console.error("Error in status listener:", error)
      }
    })
  }

  private notifyListeners(type: string, update: ContentUpdate) {
    console.log(`GitHub Realtime Update [${type}]:`, update)

    const typeListeners = this.listeners.get(type)
    if (typeListeners) {
      typeListeners.forEach((listener) => {
        try {
          listener(update)
        } catch (error) {
          console.error("Error in content listener:", error)
        }
      })
    }

    const globalListeners = this.listeners.get("*")
    if (globalListeners) {
      globalListeners.forEach((listener) => {
        try {
          listener(update)
        } catch (error) {
          console.error("Error in global listener:", error)
        }
      })
    }

    this.messageListeners.forEach((listener) => {
      try {
        listener(update)
      } catch (error) {
        console.error("Error in message listener:", error)
      }
    })
  }

  private startPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
    }

    console.log("Starting GitHub real-time polling...")
    this.updateStatus({ status: "polling", message: "Real-time polling active" })

    // Poll every 5 seconds for real-time updates
    this.pollingInterval = setInterval(async () => {
      try {
        await this.checkForUpdates()
        // Reset reconnect attempts on successful check
        this.connection.reconnectAttempts = 0
      } catch (error) {
        console.error("Polling error:", error)
        this.connection.reconnectAttempts++

        if (this.connection.reconnectAttempts >= this.connection.maxReconnectAttempts) {
          this.updateStatus({
            status: "error",
            message: "Connection issues, using local mode",
            attempts: this.connection.reconnectAttempts,
          })
          // Don't stop polling, just reduce frequency
          if (this.pollingInterval) {
            clearInterval(this.pollingInterval)
            this.pollingInterval = setInterval(() => this.checkForUpdates(), 30000) // 30 seconds
          }
        }
      }
    }, 5000) // 5 second intervals
  }

  private async checkForUpdates() {
    try {
      const response = await fetch("/api/github/status", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()

        this.connection.isConnected = true
        this.connection.lastUpdate = new Date()

        // Check if there's a new commit
        if (data.lastCommit && data.lastCommit.sha !== this.connection.lastCommitSha) {
          const isFirstLoad = this.connection.lastCommitSha === null
          this.connection.lastCommitSha = data.lastCommit.sha

          if (!isFirstLoad) {
            console.log("New commit detected:", data.lastCommit)

            // Notify about new changes
            this.notifyListeners("commits", {
              type: "commits",
              action: "update",
              data: data.lastCommit,
              timestamp: new Date(),
            })

            // Trigger content updates
            this.notifyListeners("projects", {
              type: "projects",
              action: "update",
              data: { count: data.stats?.projects || 0 },
              timestamp: new Date(),
            })

            this.notifyListeners("blog", {
              type: "blog",
              action: "update",
              data: { count: data.stats?.blogPosts || 0 },
              timestamp: new Date(),
            })

            this.notifyListeners("dashboard", {
              type: "dashboard",
              action: "update",
              data: data.stats || {},
              timestamp: new Date(),
            })
          }
        }

        this.updateStatus({
          status: "connected",
          message: data.configured ? "Real-time updates active" : "Local mode active",
          lastUpdate: this.connection.lastUpdate,
        })

        // Send heartbeat with data
        this.messageListeners.forEach((listener) => {
          try {
            listener({
              type: "heartbeat",
              timestamp: new Date(),
              data: {
                repository: data.repository,
                lastCommit: data.lastCommit,
                stats: data.stats,
                configured: data.configured,
              },
            })
          } catch (error) {
            console.error("Heartbeat listener error:", error)
          }
        })
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      this.connection.isConnected = false
      console.log("GitHub connection issue, continuing in local mode:", error)

      // Don't show error status for network issues, just log them
      this.updateStatus({
        status: "polling",
        message: "Local mode - network issues",
        attempts: this.connection.reconnectAttempts,
      })
    }
  }

  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
      console.log("GitHub real-time polling stopped")
    }
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      console.log("Connecting to GitHub real-time...")
      this.updateStatus({ status: "connecting", message: "Establishing real-time connection..." })

      this.connectionTimeout = setTimeout(() => {
        console.log("GitHub connection timeout, starting in local mode")
        this.startPolling()
        resolve()
      }, 10000)

      this.checkForUpdates()
        .then(() => {
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout)
            this.connectionTimeout = null
          }
          this.startPolling()
          console.log("GitHub real-time connected successfully")
          resolve()
        })
        .catch((error) => {
          console.log("Initial GitHub connection failed, starting in local mode:", error)
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout)
            this.connectionTimeout = null
          }
          this.startPolling()
          resolve()
        })
    })
  }

  disconnect() {
    console.log("Disconnecting from GitHub real-time...")
    this.stopPolling()
    this.connection.isConnected = false
    this.listeners.clear()
    this.statusListeners.clear()
    this.messageListeners.clear()

    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout)
      this.connectionTimeout = null
    }

    this.updateStatus({
      status: "disconnected",
      message: "Disconnected from real-time updates",
    })
  }

  subscribe(type: string, callback: (data: ContentUpdate) => void) {
    console.log(`Subscribing to GitHub real-time updates for: ${type}`)
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(callback)

    return () => {
      const typeListeners = this.listeners.get(type)
      if (typeListeners) {
        typeListeners.delete(callback)
        if (typeListeners.size === 0) {
          this.listeners.delete(type)
        }
      }
      console.log(`Unsubscribed from GitHub real-time updates for: ${type}`)
    }
  }

  onMessage(callback: (data: any) => void) {
    this.messageListeners.add(callback)

    return () => {
      this.messageListeners.delete(callback)
    }
  }

  onStatusChange(callback: (status: ConnectionStatus) => void) {
    this.statusListeners.add(callback)

    return () => {
      this.statusListeners.delete(callback)
    }
  }

  getStatus(): ConnectionStatus {
    if (this.connection.isConnected) {
      return {
        status: "connected",
        message: "Real-time updates active",
        lastUpdate: this.connection.lastUpdate || undefined,
      }
    } else if (this.pollingInterval) {
      return {
        status: "polling",
        message: "Local mode active",
        attempts: this.connection.reconnectAttempts,
      }
    } else if (this.connection.reconnectAttempts > 0) {
      return {
        status: "connecting",
        message: "Reconnecting...",
        attempts: this.connection.reconnectAttempts,
      }
    } else {
      return {
        status: "disconnected",
        message: "Not connected",
      }
    }
  }

  async forceSync() {
    console.log("Force syncing GitHub data...")
    try {
      const response = await fetch("/api/github/sync", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Force sync completed:", data)

        this.notifyListeners("sync", {
          type: "sync",
          action: "update",
          data,
          timestamp: new Date(),
        })

        // Trigger updates for all content types
        this.notifyListeners("projects", {
          type: "projects",
          action: "update",
          data: {},
          timestamp: new Date(),
        })

        this.notifyListeners("blog", {
          type: "blog",
          action: "update",
          data: {},
          timestamp: new Date(),
        })

        this.notifyListeners("dashboard", {
          type: "dashboard",
          action: "update",
          data: {},
          timestamp: new Date(),
        })

        this.updateStatus({
          status: "connected",
          message: "Manual sync completed",
          lastUpdate: new Date(),
        })

        return data
      } else {
        throw new Error(`Sync failed: HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("Force sync error:", error)
      this.updateStatus({
        status: "error",
        message: `Sync failed: ${error}`,
      })
      throw error
    }
  }

  getConnectionStatus() {
    return {
      ...this.connection,
      listenerCount: Array.from(this.listeners.values()).reduce((total, set) => total + set.size, 0),
      statusListenerCount: this.statusListeners.size,
      messageListenerCount: this.messageListeners.size,
    }
  }
}

const githubRealtimeInstance = new GitHubRealtime()

export const githubRealtime = githubRealtimeInstance
export default githubRealtimeInstance
export type { ConnectionStatus, ContentUpdate }
