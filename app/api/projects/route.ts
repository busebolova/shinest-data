import { NextResponse } from "next/server"

// Mock projects data - this would normally come from a database
const projects = [
  {
    id: "1",
    title: {
      tr: "Modern Yaşam Alanı",
      en: "Modern Living Space",
    },
    description: {
      tr: "Minimalist tasarım anlayışıyla modern yaşam alanı projesi. Açık plan konsepti ile geniş ve ferah bir atmosfer yaratılmıştır.",
      en: "Modern living space project with minimalist design approach. An open plan concept creates a spacious and airy atmosphere.",
    },
    category: {
      tr: "Konut",
      en: "Residential",
    },
    images: ["/images/poland-apartment-1.png", "/images/poland-apartment-2.png"],
    featured: true,
    status: "published",
    year: "2024",
    location: "İstanbul",
    area: "120m²",
    slug: "modern-yasam-alani",
    features: {
      tr: ["Açık Plan Konsept", "Modern Mobilyalar", "Doğal Aydınlatma"],
      en: ["Open Plan Concept", "Modern Furniture", "Natural Lighting"],
    },
  },
  {
    id: "2",
    title: {
      tr: "Lüks Ofis Tasarımı",
      en: "Luxury Office Design",
    },
    description: {
      tr: "Profesyonel ve şık ofis iç mekan tasarımı projesi. Çalışan verimliliğini artıran ergonomik çözümler uygulanmıştır.",
      en: "Professional and elegant office interior design project. Ergonomic solutions that increase employee productivity have been implemented.",
    },
    category: {
      tr: "Ofis",
      en: "Office",
    },
    images: ["/images/modern-wooden-office.png"],
    featured: true,
    status: "published",
    year: "2024",
    location: "Ankara",
    area: "200m²",
    slug: "luks-ofis-tasarimi",
    features: {
      tr: ["Ergonomik Tasarım", "Akıllı Sistemler", "Toplantı Odaları"],
      en: ["Ergonomic Design", "Smart Systems", "Meeting Rooms"],
    },
  },
  {
    id: "3",
    title: {
      tr: "Butik Otel Lobisi",
      en: "Boutique Hotel Lobby",
    },
    description: {
      tr: "Konforlu ve etkileyici otel lobisi tasarım projesi. Misafirlere unutulmaz bir karşılama deneyimi sunmaktadır.",
      en: "Comfortable and impressive hotel lobby design project. It offers guests an unforgettable welcome experience.",
    },
    category: {
      tr: "Ticari",
      en: "Commercial",
    },
    images: ["/images/luxury-hotel-lobby.png"],
    featured: false,
    status: "published",
    year: "2024",
    location: "İzmir",
    area: "300m²",
    slug: "butik-otel-lobisi",
    features: {
      tr: ["Lüks Mobilyalar", "Özel Aydınlatma", "Karşılama Alanı"],
      en: ["Luxury Furniture", "Special Lighting", "Reception Area"],
    },
  },
  {
    id: "4",
    title: {
      tr: "Yatak Odası Tasarımı",
      en: "Bedroom Design",
    },
    description: {
      tr: "Rahat ve şık yatak odası iç mekan tasarımı. Dinlendirici renkler ve fonksiyonel mobilyalar kullanılmıştır.",
      en: "Comfortable and elegant bedroom interior design. Relaxing colors and functional furniture are used.",
    },
    category: {
      tr: "Konut",
      en: "Residential",
    },
    images: ["/images/bedroom-design-1.png", "/images/bedroom-design-2.png"],
    featured: false,
    status: "published",
    year: "2023",
    location: "Bursa",
    area: "25m²",
    slug: "yatak-odasi-tasarimi",
    features: {
      tr: ["Özel Dolap Tasarımı", "Yumuşak Aydınlatma", "Konforlu Yatak"],
      en: ["Custom Wardrobe Design", "Soft Lighting", "Comfortable Bed"],
    },
  },
  {
    id: "5",
    title: {
      tr: "Cafe İç Mekan",
      en: "Cafe Interior",
    },
    description: {
      tr: "Modern ve sıcak cafe iç mekan tasarım projesi. Müşterilerin rahat edebileceği samimi bir atmosfer yaratılmıştır.",
      en: "Modern and warm cafe interior design project. An intimate atmosphere has been created where customers can relax.",
    },
    category: {
      tr: "Ticari",
      en: "Commercial",
    },
    images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
    featured: false,
    status: "published",
    year: "2023",
    location: "Antalya",
    area: "80m²",
    slug: "cafe-ic-mekan",
    features: {
      tr: ["Sıcak Atmosfer", "Özel Bar Tasarımı", "Rahat Oturma"],
      en: ["Warm Atmosphere", "Custom Bar Design", "Comfortable Seating"],
    },
  },
  {
    id: "6",
    title: {
      tr: "Banyo Tasarımı",
      en: "Bathroom Design",
    },
    description: {
      tr: "Lüks ve fonksiyonel banyo tasarım projesi. Modern donanımlar ve kaliteli malzemeler kullanılmıştır.",
      en: "Luxury and functional bathroom design project. Modern equipment and quality materials are used.",
    },
    category: {
      tr: "Konut",
      en: "Residential",
    },
    images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
    featured: false,
    status: "published",
    year: "2023",
    location: "İstanbul",
    area: "15m²",
    slug: "banyo-tasarimi",
    features: {
      tr: ["Mermer Detaylar", "Akıllı Aynalar", "Lüks Armatürler"],
      en: ["Marble Details", "Smart Mirrors", "Luxury Fixtures"],
    },
  },
]

export async function GET() {
  try {
    // Filter only published projects
    const publishedProjects = projects.filter((project) => project.status === "published")

    return NextResponse.json(publishedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Here you would normally save to a database
    // For now, we'll just return the created project
    const newProject = {
      id: Date.now().toString(),
      ...body,
      status: "published",
    }

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
