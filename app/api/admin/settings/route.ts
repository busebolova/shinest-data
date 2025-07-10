import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for admin settings
let adminSettings = {
  company: {
    name: "SHINEST İç Mimarlık",
    nameEn: "SHINEST Interior Architecture",
    logo: "/images/shinest-logo.png",
    phone: "+90 555 123 4567",
    email: "info@shinest.com",
    address: "İstanbul, Türkiye",
    addressEn: "Istanbul, Turkey",
  },
  social: {
    instagram: "https://instagram.com/shinest",
    facebook: "https://facebook.com/shinest",
    linkedin: "https://linkedin.com/company/shinest",
    youtube: "https://youtube.com/shinest",
  },
  seo: {
    title: "SHINEST İç Mimarlık - Lüks İç Mekan Tasarımı",
    titleEn: "SHINEST Interior Architecture - Luxury Interior Design",
    description: "Profesyonel iç mimarlık hizmetleri ile yaşam alanlarınızı sanat eserine dönüştürüyoruz.",
    descriptionEn:
      "We transform your living spaces into works of art with professional interior architecture services.",
    keywords: "iç mimarlık, interior design, lüks tasarım, ev dekorasyonu",
    keywordsEn: "interior architecture, luxury design, home decoration, interior design",
  },
  contact: {
    workingHours: "Pazartesi - Cuma: 09:00 - 18:00",
    workingHoursEn: "Monday - Friday: 09:00 - 18:00",
    whatsapp: "+90 555 123 4567",
  },
  security: {
    twoFactorAuth: false,
    captchaEnabled: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
  },
}

export async function GET() {
  try {
    return NextResponse.json(adminSettings)
  } catch (error) {
    console.error("Error fetching admin settings:", error)
    return NextResponse.json(adminSettings) // Return default settings on error
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json()

    // Merge updates with existing settings
    adminSettings = {
      ...adminSettings,
      ...updates,
      company: { ...adminSettings.company, ...updates.company },
      social: { ...adminSettings.social, ...updates.social },
      seo: { ...adminSettings.seo, ...updates.seo },
      contact: { ...adminSettings.contact, ...updates.contact },
      security: { ...adminSettings.security, ...updates.security },
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings: adminSettings,
    })
  } catch (error) {
    console.error("Error updating admin settings:", error)
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json()
    adminSettings = newSettings

    return NextResponse.json({
      success: true,
      message: "Settings created successfully",
      settings: adminSettings,
    })
  } catch (error) {
    console.error("Error creating admin settings:", error)
    return NextResponse.json({ success: false, error: "Failed to create settings" }, { status: 500 })
  }
}
