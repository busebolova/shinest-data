interface RealtimeConnection {
  isConnected: boolean
  lastUpdate: Date | null
  reconnectAttempts: number
  maxReconnectAttempts: number
}

interface ConnectionStatus {
  status: "connecting" | "connected" | "disconnected" | "error" | "polling"
  message?: string
  attempts?: number
  lastUpdate?: Date
}

class GitHubRealtime {
  private connection: RealtimeConnection = {
    isConnected: false,
    lastUpdate: null,
    reconnectAttempts: 0,
    maxReconnectAttempts: 3,
  }

  private listeners: Set<(data: any) => void> = new Set()
  private statusListeners: Set<(status: ConnectionStatus) => void> = new Set()
  private pollingInterval: NodeJS.Timeout | null = null
  private connectionTimeout: NodeJS.Timeout | null = null

  constructor() {
    // Auto-start polling in browser environment
    if (typeof window !== "undefined") {
      setTimeout(() => {
        this.startPolling()
      }, 1000)
    }
  }

  private updateStatus(status: ConnectionStatus) {
    this.statusListeners.forEach((listener) => {
      try {
        listener(status)
      } catch (error) {
        console.error("Error in status listener:", error)
      }
    })
  }

  private startPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
    }

    this.updateStatus({ status: "polling", message: "Starting polling mode" })

    // Poll every 30 seconds for updates
    this.pollingInterval = setInterval(async () => {
      try {
        await this.checkForUpdates()
      } catch (error) {
        console.error("Polling error:", error)
        this.connection.reconnectAttempts++

        if (this.connection.reconnectAttempts >= this.connection.maxReconnectAttempts) {
          this.updateStatus({
            status: "error",
            message: "Max polling attempts reached",
            attempts: this.connection.reconnectAttempts,
          })
          this.stopPolling()
        }
      }
    }, 30000)
  }

  private async checkForUpdates() {
    try {
      const response = await fetch("/api/github/status")

      if (response.ok) {
        const data = await response.json()

        this.connection.isConnected = true
        this.connection.lastUpdate = new Date()
        this.connection.reconnectAttempts = 0

        this.updateStatus({
          status: "connected",
          message: "Polling active",
          lastUpdate: this.connection.lastUpdate,
        })

        // Notify listeners
        this.listeners.forEach((listener) => {
          try {
            listener(data)
          } catch (error) {
            console.error("Listener error:", error)
          }
        })
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      this.connection.isConnected = false
      this.updateStatus({
        status: "error",
        message: `Connection failed: ${error}`,
        attempts: this.connection.reconnectAttempts,
      })
      throw error
    }
  }

  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
    }
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.updateStatus({ status: "connecting", message: "Establishing connection..." })

      // Set connection timeout
      this.connectionTimeout = setTimeout(() => {
        reject(new Error("Connection timeout"))
      }, 10000)

      // Attempt immediate connection
      this.checkForUpdates()
        .then(() => {
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout)
            this.connectionTimeout = null
          }
          resolve()
        })
        .catch((error) => {
          if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout)
            this.connectionTimeout = null
          }
          // Don't reject, just start polling
          this.startPolling()
          resolve()
        })
    })
  }

  disconnect() {
    this.stopPolling()
    this.connection.isConnected = false
    this.listeners.clear()
    this.statusListeners.clear()

    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout)
      this.connectionTimeout = null
    }

    this.updateStatus({
      status: "disconnected",
      message: "Disconnected from GitHub",
    })
  }

  onMessage(callback: (data: any) => void) {
    this.listeners.add(callback)

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback)
    }
  }

  onStatusChange(callback: (status: ConnectionStatus) => void) {
    this.statusListeners.add(callback)

    // Return unsubscribe function
    return () => {
      this.statusListeners.delete(callback)
    }
  }

  getStatus(): ConnectionStatus {
    if (this.connection.isConnected) {
      return {
        status: "connected",
        message: "Real-time connection active",
        lastUpdate: this.connection.lastUpdate || undefined,
      }
    } else if (this.pollingInterval) {
      return {
        status: "polling",
        message: "Using polling mode",
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
    try {
      const response = await fetch("/api/github/sync", { method: "POST" })

      if (response.ok) {
        const data = await response.json()

        // Notify listeners
        this.listeners.forEach((listener) => {
          try {
            listener({ type: "sync", data })
          } catch (error) {
            console.error("Listener error:", error)
          }
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
      listenerCount: this.listeners.size,
      statusListenerCount: this.statusListeners.size,
    }
  }
}

// Create singleton instance
const githubRealtimeInstance = new GitHubRealtime()

// Named export
export const githubRealtime = githubRealtimeInstance

// Default export
export default githubRealtimeInstance

// Type exports
export type { ConnectionStatus }
