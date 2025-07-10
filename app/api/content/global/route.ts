import { NextResponse } from "next/server"

const globalContent = {
  company: {
    name: "SHINEST İç Mimarlık",
    description: "Yaşam alanlarınızı hayallerinizle buluşturan profesyonel iç mimarlık hizmetleri.",
    tagline: "Mekanlarınız Yaşamınıza Işık Tutar!",
    founded: "2020",
    location: "İstanbul, Türkiye",
  },
  contact: {
    phone: "+90 (212) 555 0123",
    email: "info@shinest.com",
    address: "Ataşehir, İstanbul, Türkiye",
    workingHours: "Pazartesi - Cuma: 09:00 - 18:00",
  },
  social: {
    instagram: "https://instagram.com/shinest",
    facebook: "https://facebook.com/shinest",
    linkedin: "https://linkedin.com/company/shinest",
  },
  seo: {
    title: "SHINEST İç Mimarlık - Profesyonel İç Mekan Tasarımı",
    description:
      "İstanbul'da profesyonel iç mimarlık hizmetleri. Modern tasarım anlayışıyla yaşam alanlarınızı dönüştürüyoruz.",
    keywords: "iç mimarlık, interior design, İstanbul, tasarım, dekorasyon, mimarlık",
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

    // Here you would normally update the database
    // For now, we'll just return the updated content
    const updatedContent = { ...globalContent, ...body }

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error updating global content:", error)
    return NextResponse.json({ error: "Failed to update global content" }, { status: 500 })
  }
}
