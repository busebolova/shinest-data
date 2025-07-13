import { NextResponse } from "next/server"

const globalContent = {
  company: {
    name: "SHINEST İç Mimarlık",
    description: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz",
    logo: "/images/shinest-logo.png",
    founded: "2020",
    location: "İstanbul, Türkiye",
  },
  contact: {
    phone: "+90 (212) 123 45 67",
    email: "info@shinest.com",
    address: "İstanbul, Türkiye",
  },
  social: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  seo: {
    title: "SHINEST İç Mimarlık - Yaşam Alanlarınızı Sanat Eserine Dönüştürüyoruz",
    description:
      "Modern tasarım anlayışı ile fonksiyonel ve estetik mekanlar yaratıyoruz. İç mimarlık danışmanlığı, mekan tasarımı ve uygulama hizmetleri.",
    keywords: "iç mimarlık, mekan tasarımı, ev dekorasyonu, ofis tasarımı, istanbul iç mimar",
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

export async function PUT(request: Request) {
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
