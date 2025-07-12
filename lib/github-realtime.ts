"use client"

import { githubAPI } from "./github-api"

type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error"

interface RealtimeData {
  projects: any[]
  blogs: any[]
  dashboard: any
  lastUpdate: string
  connectionStatus: ConnectionStatus
}

interface RealtimeMessage {
  type: "sync" | "error" | "connected" | "disconnected"
  data?: any
  timestamp: string
}

class GithubRealtime {
  private static instance: GithubRealtime
  private listeners: Set<(data: RealtimeData) => void> = new Set()
  private messageListeners: Set<(message: RealtimeMessage) => void> = new Set()
  private data: RealtimeData = {
    projects: [],
    blogs: [],
    dashboard: {},
    lastUpdate: new Date().toISOString(),
    connectionStatus: "disconnected",
  }
  private intervalId: NodeJS.Timeout | null = null
  private retryCount = 0
  private maxRetries = 3
  private isInitialized = false

  private constructor() {
    if (typeof window !== "undefined") {
      this.initialize()
    }
  }

  static getInstance(): GithubRealtime {
    if (!GithubRealtime.instance) {
      GithubRealtime.instance = new GithubRealtime()
    }
    return GithubRealtime.instance
  }

  private async initialize() {
    if (this.isInitialized) return
    this.isInitialized = true

    try {
      await this.connect()
      this.startPolling()

      // Online/offline event listeners
      window.addEventListener("online", this.handleOnline.bind(this))
      window.addEventListener("offline", this.handleOffline.bind(this))

      // Cleanup on page unload
      window.addEventListener("beforeunload", this.cleanup.bind(this))
    } catch (error) {
      console.error("GitHub Realtime initialization failed:", error)
      this.handleError(error)
    }
  }

  private async connect() {
    try {
      this.updateConnectionStatus("connecting")
      this.broadcastMessage("connecting")

      // Check if GitHub is configured
      if (!githubAPI.isConfigured()) {
        // Use localStorage fallback
        await this.loadFromLocalStorage()
        this.updateConnectionStatus("connected")
        this.broadcastMessage("connected", { source: "localStorage" })
        return
      }

      // Try to fetch from GitHub
      const [projects, blogs] = await Promise.all([
        githubAPI.getProjects().catch(() => []),
        githubAPI.getBlogPosts().catch(() => []),
      ])

      // Get dashboard stats
      const dashboardResponse = await fetch("/api/admin/dashboard").catch(() => null)
      const dashboard = dashboardResponse?.ok ? await dashboardResponse.json() : {}

      this.data = {
        projects,
        blogs,
        dashboard,
        lastUpdate: new Date().toISOString(),
        connectionStatus: "connected",
      }

      // Save to localStorage as backup
      this.saveToLocalStorage()

      this.retryCount = 0
      this.updateConnectionStatus("connected")
      this.broadcastMessage("connected", { source: "github" })
      this.notifyListeners()
    } catch (error) {
      console.error("GitHub connection failed:", error)
      await this.loadFromLocalStorage()
      this.handleError(error)
    }
  }

  private async loadFromLocalStorage() {
    try {
      const projects = JSON.parse(localStorage.getItem("shinest_projects") || "[]")
      const blogs = JSON.parse(localStorage.getItem("shinest_blogs") || "[]")
      const dashboard = JSON.parse(localStorage.getItem("shinest_dashboard") || "{}")

      this.data = {
        projects,
        blogs,
        dashboard,
        lastUpdate: new Date().toISOString(),
        connectionStatus: "connected",
      }

      this.notifyListeners()
    } catch (error) {
      console.error("localStorage load failed:", error)
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem("shinest_projects", JSON.stringify(this.data.projects))
      localStorage.setItem("shinest_blogs", JSON.stringify(this.data.blogs))
      localStorage.setItem("shinest_dashboard", JSON.stringify(this.data.dashboard))
      localStorage.setItem("shinest_last_update", this.data.lastUpdate)
    } catch (error) {
      console.error("localStorage save failed:", error)
    }
  }

  private handleError(error: any) {
    this.retryCount++
    this.updateConnectionStatus("error")
    this.broadcastMessage("error", { error: error.message, retryCount: this.retryCount })

    if (this.retryCount <= this.maxRetries) {
      const delay = Math.pow(2, this.retryCount) * 1000 // Exponential backoff
      setTimeout(() => {
        this.connect()
      }, delay)
    }
  }

  private handleOnline() {
    console.log("Connection restored")
    this.retryCount = 0
    this.connect()
  }

  private handleOffline() {
    console.log("Connection lost")
    this.updateConnectionStatus("disconnected")
    this.broadcastMessage("disconnected")
  }

  private updateConnectionStatus(status: ConnectionStatus) {
    this.data.connectionStatus = status
    this.notifyListeners()
  }

  private broadcastMessage(type: RealtimeMessage["type"], data?: any) {
    const message: RealtimeMessage = {
      type,
      data,
      timestamp: new Date().toISOString(),
    }

    this.messageListeners.forEach((listener) => {
      try {
        listener(message)
      } catch (error) {
        console.error("Message listener error:", error)
      }
    })
  }

  private notifyListeners() {
    this.listeners.forEach((callback) => {
      try {
        callback({ ...this.data })
      } catch (error) {
        console.error("Listener notification error:", error)
      }
    })
  }

  private startPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    // Poll every 30 seconds
    this.intervalId = setInterval(() => {
      if (this.data.connectionStatus === "connected") {
        this.connect()
      }
    }, 30000)
  }

  private cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.handleOnline.bind(this))
      window.removeEventListener("offline", this.handleOffline.bind(this))
      window.removeEventListener("beforeunload", this.cleanup.bind(this))
    }

    this.listeners.clear()
    this.messageListeners.clear()
  }

  // Public methods
  subscribe(callback: (data: RealtimeData) => void): () => void {
    this.listeners.add(callback)

    // Send current data immediately
    if (this.data.projects.length > 0 || this.data.blogs.length > 0) {
      callback({ ...this.data })
    }

    return () => {
      this.listeners.delete(callback)
    }
  }

  onMessage(listener: (message: RealtimeMessage) => void): () => void {
    this.messageListeners.add(listener)

    return () => {
      this.messageListeners.delete(listener)
    }
  }

  async refresh(): Promise<void> {
    await this.connect()
  }

  getConnectionStatus(): ConnectionStatus {
    return this.data.connectionStatus
  }

  getData(): RealtimeData {
    return { ...this.data }
  }

  isGitHubConfigured(): boolean {
    return githubAPI.isConfigured()
  }

  destroy() {
    this.cleanup()
  }
}

export const githubRealtime = GithubRealtime.getInstance()
export type { RealtimeData, ConnectionStatus, RealtimeMessage }
