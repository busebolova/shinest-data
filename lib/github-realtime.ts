interface GitHubRealtimeConfig {
  token?: string
  owner?: string
  repo?: string
  branch?: string
}

interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
  }
  payload: any
  created_at: string
}

interface GitHubStatus {
  connected: boolean
  lastSync: string | null
  error: string | null
  rateLimit: {
    remaining: number
    reset: number
  }
}

class GitHubRealtime {
  private config: GitHubRealtimeConfig
  private status: GitHubStatus
  private listeners: Set<(status: GitHubStatus) => void>
  private eventListeners: Set<(events: GitHubEvent[]) => void>
  private syncInterval: NodeJS.Timeout | null = null

  constructor(config: GitHubRealtimeConfig = {}) {
    this.config = {
      token: config.token || process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      owner: config.owner || process.env.GITHUB_OWNER || "shinest-architecture",
      repo: config.repo || process.env.GITHUB_REPO || "shinest-data",
      branch: config.branch || process.env.GITHUB_BRANCH || "main",
    }

    this.status = {
      connected: false,
      lastSync: null,
      error: null,
      rateLimit: {
        remaining: 5000,
        reset: Date.now() + 3600000, // 1 hour from now
      },
    }

    this.listeners = new Set()
    this.eventListeners = new Set()
  }

  isConfigured(): boolean {
    return !!(this.config.token && this.config.owner && this.config.repo)
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.isConfigured()) {
      throw new Error("GitHub API not configured")
    }

    const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.config.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      // Update rate limit info
      const remaining = response.headers.get("x-ratelimit-remaining")
      const reset = response.headers.get("x-ratelimit-reset")
      
      if (remaining && reset) {
        this.status.rateLimit = {
          remaining: parseInt(remaining),
          reset: parseInt(reset) * 1000, // Convert to milliseconds
        }
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      this.updateStatus({
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
      throw error
    }
  }

  private updateStatus(updates: Partial<GitHubStatus>) {
    this.status = { ...this.status, ...updates }
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.status)
      } catch (error) {
        console.error("Error in status listener:", error)
      }
    })
  }

  private notifyEventListeners(events: GitHubEvent[]) {
    this.eventListeners.forEach((listener) => {
      try {
        listener(events)
      } catch (error) {
        console.error("Error in event listener:", error)
      }
    })
  }

  async connect(): Promise<void> {
    if (!this.isConfigured()) {
      this.updateStatus({
        connected: false,
        error: "GitHub API not configured",
      })
      return
    }

    try {
      // Test connection by fetching repository info
      await this.makeRequest("")
      
      this.updateStatus({
        connected: true,
        error: null,
        lastSync: new Date().toISOString(),
      })

      // Start periodic sync
      this.startSync()
    } catch (error) {
      this.updateStatus({
        connected: false,
        error: error instanceof Error ? error.message : "Connection failed",
      })
    }
  }

  disconnect(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }

    this.updateStatus({
      connected: false,
      lastSync: null,
      error: null,
    })
  }

  private startSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    // Sync every 30 seconds
    this.syncInterval = setInterval(() => {
      this.sync()
    }, 30000)
  }

  async sync(): Promise<void> {
    if (!this.status.connected) {
      return
    }

    try {
      // Fetch recent events
      const events = await this.getRecentEvents()
      this.notifyEventListeners(events)

      this.updateStatus({
        lastSync: new Date().toISOString(),
        error: null,
      })
    } catch (error) {
      console.error("Sync error:", error)
      this.updateStatus({
        error: error instanceof Error ? error.message : "Sync failed",
      })
    }
  }

  async getRecentEvents(limit = 10): Promise<GitHubEvent[]> {
    try {
      const events = await this.makeRequest(`events?per_page=${limit}`)
      return events || []
    } catch (error) {
      console.error("Error fetching events:", error)
      return []
    }
  }

  async getCommits(limit = 10): Promise<any[]> {
    try {
      const commits = await this.makeRequest(`commits?per_page=${limit}&sha=${this.config.branch}`)
      return commits || []
    } catch (error) {
      console.error("Error fetching commits:", error)
      return []
    }
  }

  async getRepositoryInfo(): Promise<any> {
    try {
      return await this.makeRequest("")
    } catch (error) {
      console.error("Error fetching repository info:", error)
      return null
    }
  }

  async getBranches(): Promise<any[]> {
    try {
      const branches = await this.makeRequest("branches")
      return branches || []
    } catch (error) {
      console.error("Error fetching branches:", error)
      return []
    }
  }

  async getContributors(): Promise<any[]> {
    try {
      const contributors = await this.makeRequest("contributors")
      return contributors || []
    } catch (error) {
      console.error("Error fetching contributors:", error)
      return []
    }
  }

  // Event listeners
  onStatusChange(listener: (status: GitHubStatus) => void): () => void {
    this.listeners.add(listener)
    
    // Call immediately with current status
    listener(this.status)
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  onEvents(listener: (events: GitHubEvent[]) => void): () => void {
    this.eventListeners.add(listener)
    
    // Return unsubscribe function
    return () => {
      this.eventListeners.delete(listener)
    }
  }

  getStatus(): GitHubStatus {
    return { ...this.status }
  }

  // Utility methods
  isRateLimited(): boolean {
    return this.status.rateLimit.remaining < 10
  }

  getRateLimitResetTime(): Date {
    return new Date(this.status.rateLimit.reset)
  }

  getTimeUntilReset(): number {
    return Math.max(0, this.status.rateLimit.reset - Date.now())
  }
}

// Singleton instance
export const githubRealtime = new GitHubRealtime()

// Auto-connect if configured
if (typeof window !== "undefined" && githubRealtime.isConfigured()) {
  githubRealtime.connect().catch(console.error)
}

export type { GitHubEvent, GitHubStatus, GitHubRealtimeConfig }
