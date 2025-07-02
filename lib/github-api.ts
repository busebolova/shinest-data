interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content?: string
  encoding?: string
}

interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
}

class GitHubAPI {
  private baseUrl = "https://api.github.com"
  private owner: string
  private repo: string
  private token: string
  private branch: string

  constructor() {
    this.owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || ""
    this.repo = process.env.NEXT_PUBLIC_GITHUB_REPO || ""
    this.token = process.env.GITHUB_TOKEN || ""
    this.branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main"
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getFile(path: string): Promise<GitHubFile> {
    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`)
  }

  async createFile(path: string, content: string, message: string): Promise<any> {
    const encodedContent = Buffer.from(content).toString("base64")

    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: encodedContent,
        branch: this.branch,
      }),
    })
  }

  async updateFile(path: string, content: string, message: string, sha: string): Promise<any> {
    const encodedContent = Buffer.from(content).toString("base64")

    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: encodedContent,
        sha,
        branch: this.branch,
      }),
    })
  }

  async deleteFile(path: string, message: string, sha: string): Promise<any> {
    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: "DELETE",
      body: JSON.stringify({
        message,
        sha,
        branch: this.branch,
      }),
    })
  }

  async listFiles(path = ""): Promise<GitHubFile[]> {
    return this.request(`/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`)
  }

  async getCommits(limit = 10): Promise<GitHubCommit[]> {
    return this.request(`/repos/${this.owner}/${this.repo}/commits?per_page=${limit}&sha=${this.branch}`)
  }

  async createOrUpdateFile(path: string, content: string, message: string): Promise<any> {
    try {
      const existingFile = await this.getFile(path)
      return this.updateFile(path, content, message, existingFile.sha)
    } catch (error) {
      // File doesn't exist, create it
      return this.createFile(path, content, message)
    }
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const base64Content = Buffer.from(arrayBuffer).toString("base64")

    const message = `Upload image: ${file.name}`
    await this.createOrUpdateFile(path, base64Content, message)

    return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${path}`
  }

  async savePageContent(page: string, content: any): Promise<void> {
    const path = `data/pages/${page}.json`
    const jsonContent = JSON.stringify(content, null, 2)
    const message = `Update ${page} page content`

    await this.createOrUpdateFile(path, jsonContent, message)
  }

  async getPageContent(page: string): Promise<any> {
    try {
      const file = await this.getFile(`data/pages/${page}.json`)
      if (file.content) {
        const content = Buffer.from(file.content, "base64").toString("utf-8")
        return JSON.parse(content)
      }
    } catch (error) {
      console.error(`Error loading ${page} content:`, error)
    }
    return null
  }
}

export const githubAPI = new GitHubAPI()
export type { GitHubFile, GitHubCommit }
