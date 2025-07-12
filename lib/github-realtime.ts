"use client"

import { githubAPI } from "./github-api"
import { localStorage } from "./local-storage" // localStorage'ı doğrudan kullanmak yerine, dataManager'ı kullanacağız.

type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error"

interface RealtimeData {
  projects: any[]
  blogs: any[]
  dashboard: any
  lastUpdate: string
  connectionStatus: ConnectionStatus
}

interface RealtimeMessage {
  type: "sync" | "error" | "connected" | "disconnected" | "connecting"
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

      window.addEventListener("online", this.handleOnline.bind(this))
      window.addEventListener("offline", this.handleOffline.bind(this))
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

      // Check if GitHub API is configured on the server side (via env vars)
      // For client-side, we rely on the `githubAPI.isConfigured()` check
      // which will be false if GITHUB_TOKEN is not exposed to client (which it shouldn't be).
      // So, client-side will always fallback to localStorage for reads.
      // Server-side API routes will handle GitHub writes.

      let projects: any[] = []
      let blogs: any[] = []
      let dashboard: any = {}
      let source: "github" | "localStorage" = "localStorage"

      if (githubAPI.isConfigured()) {
        // This check will be true only if GITHUB_TOKEN is exposed to client, which is not recommended.
        // For this setup, it's better to assume client-side reads from localStorage and server-side writes to GitHub.
        // However, the prompt implies client-side can *try* to read from GitHub.
        // Let's keep the current logic for now, assuming GITHUB_TOKEN is available client-side for demo purposes.
        try {
          const [githubProjects, githubBlogs] = await Promise.all([githubAPI.getProjects(), githubAPI.getBlogPosts()])
          projects = githubProjects.projects || []
          blogs = githubBlogs.posts || []

          const dashboardResponse = await fetch("/api/admin/dashboard")
          if (dashboardResponse.ok) {
            dashboard = await dashboardResponse.json()
          }
          source = "github"
        } catch (githubError) {
          console.warn("Failed to fetch from GitHub, falling back to localStorage:", githubError)
          await this.loadFromLocalStorage()
          source = "localStorage"
        }
      } else {
        await this.loadFromLocalStorage()
        source = "localStorage"
      }

      this.data = {
        projects: projects.length > 0 ? projects : this.data.projects, // Keep existing if new fetch is empty
        blogs: blogs.length > 0 ? blogs : this.data.blogs, // Keep existing if new fetch is empty
        dashboard: Object.keys(dashboard).length > 0 ? dashboard : this.data.dashboard, // Keep existing if new fetch is empty
        lastUpdate: new Date().toISOString(),
        connectionStatus: "connected",
      }

      this.saveToLocalStorage() // Always save the latest fetched data (from GitHub or localStorage) to localStorage as backup

      this.retryCount = 0
      this.updateConnectionStatus("connected")
      this.broadcastMessage("connected", { source })
      this.notifyListeners()
    } catch (error) {
      console.error("GitHub connection failed:", error)
      await this.loadFromLocalStorage() // Ensure localStorage data is loaded on connection failure
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
        lastUpdate: localStorage.getItem("shinest_last_update") || new Date().toISOString(),
        connectionStatus: "disconnected", // Mark as disconnected if only localStorage is used
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
    } else {
      console.error("Max retries reached. Staying in error state.")
      this.updateConnectionStatus("disconnected") // After max retries, consider it disconnected
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
    if (this.data.projects.length > 0 || this.data.blogs.length > 0 || Object.keys(this.data.dashboard).length > 0) {
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
    // This check is primarily for server-side. Client-side GITHUB_TOKEN should not be exposed.
    // For client-side, this will likely be false, leading to localStorage fallback.
    return githubAPI.isConfigured()
  }

  destroy() {
    this.cleanup()
  }
}

export const githubRealtime = GithubRealtime.getInstance()
export type { RealtimeData, ConnectionStatus, RealtimeMessage }
