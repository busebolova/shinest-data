import { NextResponse } from "next/server"

// Mock global content data
const globalContent = {
  site: {
    name: "SHINEST İç Mimarlık",
    description: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz",
    logo: "/images/shinest-logo.png",
    favicon: "/favicon.ico",
  },
  contact: {
    phone: "+90 (212) 123 45 67",
    email: "info@shinest.com",
    address: "İstanbul, Türkiye",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  colors: {
    primary: "#15415b",
    secondary: "#c4975a",
    accent: "#b8864d",
  },
}

export async function GET() {
  try {
    return NextResponse.json(globalContent)
  } catch (error) {
    console.error("Error fetching global content:", error)
    return NextResponse.json({ error: "Failed to fetch global content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Here you would normally save to a database
    // For now, we'll just return the updated content
    const updatedContent = {
      ...globalContent,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error updating global content:", error)
    return NextResponse.json({ error: "Failed to update global content" }, { status: 500 })
  }
}
