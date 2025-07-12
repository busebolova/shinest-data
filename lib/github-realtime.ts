// lib/github-realtime.ts
import { LocalStorage } from "./local-storage"

export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error"

export interface RealtimeMessage {
  type: "sync-success" | "sync-error" | "connection-status"
  data?: any
}

export interface RealtimeData {
  connectionStatus: ConnectionStatus
  projects: any[] | null
  blogs: any[] | null
  dashboard: { messages: number; visitors: number } | null
  events: any[] | null
  lastUpdate: string
  error: string | null
  isGitHubConfigured: boolean
}

type Listener = (data: RealtimeData) => void
type MessageListener = (message: RealtimeMessage) => void

const CACHE_KEY = "shinest-realtime-cache"
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

class GitHubRealtime {
  private listeners: Listener[] = []
  private messageListeners: MessageListener[] = []
  private data: RealtimeData
  private intervalId: NodeJS.Timeout | null = null
  private isInitialized = false

  constructor() {
    const cachedData = LocalStorage.getItem(CACHE_KEY)
    const now = new Date().getTime()

    if (cachedData && now - new Date(cachedData.lastUpdate).getTime() < CACHE_TTL) {
      this.data = { ...cachedData, connectionStatus: "disconnected" }
    } else {
      this.data = {
        connectionStatus: "disconnected",
        projects: null,
        blogs: null,
        dashboard: null,
        events: null,
        lastUpdate: "",
        error: null,
        isGitHubConfigured: false,
      }
    }
  }

  public init() {
    if (this.isInitialized) return
    this.isInitialized = true

    this.refresh()
    if (this.intervalId) clearInterval(this.intervalId)
    this.intervalId = setInterval(() => this.refresh(), 30000) // Refresh every 30 seconds
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener)
    // Immediately notify the new listener with the current data
    listener(this.data)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  public onMessage(listener: MessageListener): () => void {
    this.messageListeners.push(listener)
    return () => {
      this.messageListeners = this.messageListeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.data))
  }

  private sendMessage(message: RealtimeMessage) {
    this.messageListeners.forEach((listener) => listener(message))
  }

  private updateState(updates: Partial<RealtimeData>) {
    this.data = { ...this.data, ...updates }
    this.notify()
  }

  private async fetchData(endpoint: string) {
    try {
      const response = await fetch(`/api/github/${endpoint}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error in fetchData for ${endpoint}:`, error)
      return null
    }
  }

  async getStatus() {
    return this.fetchData("status")
  }

  async getEvents() {
    return this.fetchData("events")
  }

  async sync() {
    return this.fetchData("sync")
  }

  public async refresh() {
    this.updateState({ connectionStatus: "connecting" })

    try {
      const statusRes = await fetch("/api/github/status")
      const statusData = await statusRes.json()

      const isConfigured = statusData.connected

      if (!isConfigured) {
        this.updateState({
          connectionStatus: "disconnected",
          error: "GitHub API not configured. Using local mock data.",
          isGitHubConfigured: false,
        })
        // In a real scenario, you might load mock data here
        // For now, we just show disconnected state.
        return
      }

      const [projectsRes, blogsRes, eventsRes, dashboardRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/blog"),
        fetch("/api/github/events"),
        fetch("/api/admin/dashboard"),
      ])

      if (!projectsRes.ok || !blogsRes.ok || !eventsRes.ok || !dashboardRes.ok) {
        throw new Error("Failed to fetch data from one or more endpoints.")
      }

      const [projects, blogs, events, dashboard] = await Promise.all([
        projectsRes.json(),
        blogsRes.json(),
        eventsRes.json(),
        dashboardRes.json(),
      ])

      const newState: RealtimeData = {
        connectionStatus: "connected",
        projects,
        blogs,
        events,
        dashboard,
        lastUpdate: new Date().toISOString(),
        error: null,
        isGitHubConfigured: true,
      }

      this.updateState(newState)
      LocalStorage.setItem(CACHE_KEY, newState)
      this.sendMessage({ type: "sync-success", data: { source: "github" } })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      this.updateState({ connectionStatus: "error", error: errorMessage })
      this.sendMessage({ type: "sync-error", data: { error: errorMessage } })
      console.error("Realtime refresh failed:", error)
    }
  }

  public getData(): RealtimeData {
    return this.data
  }
}

export const githubRealtime = new GitHubRealtime()
