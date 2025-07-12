import { NextResponse } from "next/server"
import { dataManager } from "@/lib/data-manager"

// Mock projects data - this would normally come from a database
const projects = [
  {
    id: "api-1",
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
    id: "api-2",
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
    id: "api-3",
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
]

export async function GET() {
  try {
    const projectsData = await dataManager.getProjects()
    return NextResponse.json(projectsData)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newProjectData = await request.json()
    const newProject = await dataManager.createProject(newProjectData)

    // Trigger revalidation for projects page
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify({ path: "/projects" }),
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
