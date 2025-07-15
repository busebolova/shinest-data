"use server"

import { Octokit } from "@octokit/rest"
import type { BufferEncoding } from "buffer"

const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER!
const repo = process.env.NEXT_PUBLIC_GITHUB_REPO!
const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main" // Varsayılan olarak 'main' dalı
const token = process.env.GITHUB_TOKEN!

const octokit = new Octokit({ auth: token })

interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: "file" | "dir"
  _links: {
    git: string
    self: string
    html: string
  }
}

interface GitHubContent {
  content: string
  encoding: string
  name: string
  path: string
  sha: string
}

/**
 * Belirli bir klasördeki dosyaları listeler.
 * @param path GitHub deposundaki klasör yolu (örn: 'content/blog')
 * @returns Dosya listesi veya hata
 */
export async function listGitHubFiles(path: string): Promise<GitHubFile[] | { error: string }> {
  if (!token || !owner || !repo) {
    return { error: "GitHub API kimlik bilgileri eksik." }
  }

  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    })

    if (Array.isArray(response.data)) {
      return response.data.filter((item) => item.type === "file") as GitHubFile[]
    } else {
      return { error: "Belirtilen yol bir klasör değil veya boş." }
    }
  } catch (error: any) {
    console.error("GitHub dosyalarını listelerken hata:", error)
    return { error: `Dosyalar listelenirken hata oluştu: ${error.message || error}` }
  }
}

/**
 * Belirli bir dosyanın içeriğini getirir.
 * @param path GitHub deposundaki dosya yolu (örn: 'content/blog/my-post.md')
 * @returns Dosya içeriği (UTF-8 string olarak) veya hata
 */
export async function getGitHubFileContent(path: string): Promise<string | { error: string }> {
  if (!token || !owner || !repo) {
    return { error: "GitHub API kimlik bilgileri eksik." }
  }

  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    })

    const data = response.data as GitHubContent

    if (data.type === "file" && data.content) {
      // Base64 içeriği UTF-8'e dönüştür
      return Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf-8")
    } else {
      return { error: "Dosya içeriği bulunamadı veya dosya tipi uygun değil." }
    }
  } catch (error: any) {
    console.error(`GitHub dosya içeriği alınırken hata (${path}):`, error)
    return { error: `Dosya içeriği alınırken hata oluştu: ${error.message || error}` }
  }
}

/**
 * Belirli bir dosyanın içeriğini günceller.
 * @param path GitHub deposundaki dosya yolu
 * @param content Yeni dosya içeriği (UTF-8 string)
 * @param message Commit mesajı
 * @param sha Dosyanın mevcut SHA değeri (güncelleme için gerekli)
 * @returns Başarı durumu veya hata
 */
export async function updateGitHubFileContent(
  path: string,
  content: string,
  message: string,
  sha: string,
): Promise<{ success: boolean; message?: string; newSha?: string; error?: string }> {
  if (!token || !owner || !repo) {
    return { success: false, error: "GitHub API kimlik bilgileri eksik." }
  }

  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content, "utf-8").toString("base64"), // İçeriği Base64'e dönüştür
      sha, // Mevcut SHA değeri
      branch,
    })

    return {
      success: true,
      message: "Dosya başarıyla güncellendi.",
      newSha: response.data.content?.sha,
    }
  } catch (error: any) {
    console.error(`GitHub dosya güncellenirken hata (${path}):`, error)
    return { success: false, error: `Dosya güncellenirken hata oluştu: ${error.message || error}` }
  }
}
