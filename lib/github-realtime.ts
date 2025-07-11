"use client"

interface RealtimeData {
  projects: any[]
  blogs: any[]
  messages: any[]
  timestamp: string
}

interface ConnectionStatus {
  isConnected: boolean
  lastUpdate: Date
  retryCount: number
}

class GitHubRealtime {
  private subscribers: ((data: RealtimeData) => void)[] = []
  private connectionStatus: ConnectionStatus = {
    isConnected: false,
    lastUpdate: new Date(),
    retryCount: 0,
  }
  private syncInterval: NodeJS.Timeout | null = null
  private maxRetries = 3

  constructor() {
    if (typeof window !== "undefined") {
      this.initialize()
    }
  }

  private initialize() {
    // İlk bağlantıyı kur
    this.connect()

    // Periyodik senkronizasyon başlat
    this.startPeriodicSync()

    // Online/offline durumunu dinle
    window.addEventListener("online", this.handleOnline.bind(this))
    window.addEventListener("offline", this.handleOffline.bind(this))
  }

  private async connect() {
    try {
      // localStorage'dan verileri al
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]")
      const messages = JSON.parse(localStorage.getItem("messages") || "[]")

      const data: RealtimeData = {
        projects,
        blogs,
        messages,
        timestamp: new Date().toISOString(),
      }

      // Bağlantı durumunu güncelle
      this.connectionStatus = {
        isConnected: true,
        lastUpdate: new Date(),
        retryCount: 0,
      }

      // Subscribers'a bildir
      this.notifySubscribers(data)
    } catch (error) {
      console.error("GitHub Realtime connection error:", error)
      this.handleConnectionError()
    }
  }

  private handleConnectionError() {
    this.connectionStatus.isConnected = false
    this.connectionStatus.retryCount++

    if (this.connectionStatus.retryCount <= this.maxRetries) {
      // Yeniden bağlanmayı dene
      setTimeout(() => {
        this.connect()
      }, 5000 * this.connectionStatus.retryCount) // Exponential backoff
    }
  }

  private startPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    this.syncInterval = setInterval(() => {
      if (this.connectionStatus.isConnected) {
        this.sync()
      }
    }, 30000) // 30 saniyede bir
  }

  private async sync() {
    try {
      // Verileri güncelle
      await this.connect()
    } catch (error) {
      console.error("Sync error:", error)
      this.handleConnectionError()
    }
  }

  private handleOnline() {
    console.log("Connection restored")
    this.connectionStatus.retryCount = 0
    this.connect()
  }

  private handleOffline() {
    console.log("Connection lost")
    this.connectionStatus.isConnected = false
  }

  private notifySubscribers(data: RealtimeData) {
    this.subscribers.forEach((callback) => {
      try {
        callback(data)
      } catch (error) {
        console.error("Subscriber notification error:", error)
      }
    })
  }

  // Public methods
  subscribe(callback: (data: RealtimeData) => void): () => void {
    this.subscribers.push(callback)

    // Unsubscribe function döndür
    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus }
  }

  forceSync() {
    this.sync()
  }

  disconnect() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }

    this.connectionStatus.isConnected = false
    this.subscribers = []

    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.handleOnline.bind(this))
      window.removeEventListener("offline", this.handleOffline.bind(this))
    }
  }
}

// Singleton instance
export const githubRealtime = new GitHubRealtime()

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    githubRealtime.disconnect()
  })
}
