"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContentEditor } from "@/components/admin/content-editor"

// Mock content blocks data
const mockContentBlocks = [
  {
    id: "hero",
    title: "Hero Bölümü",
    description: "Ana sayfa hero bölümü içeriği",
    content: {
      title: "Modern İç Mimari Çözümleri",
      description: "Yaşam alanlarınızı dönüştüren profesyonel tasarım hizmetleri",
      image: "/images/hero-image.png",
    },
    order_index: 1,
  },
  {
    id: "about",
    title: "Hakkımızda Bölümü",
    description: "Ana sayfa hakkımızda bölümü içeriği",
    content: {
      title: "Shinest İç Mimarlık",
      description: "15 yıllık deneyimimizle modern ve fonksiyonel yaşam alanları tasarlıyoruz.",
      image: "/images/about-section.png",
    },
    order_index: 2,
  },
  {
    id: "services",
    title: "Hizmetler Bölümü",
    description: "Ana sayfa hizmetler bölümü içeriği",
    content: {
      title: "Hizmetlerimiz",
      description: "Danışmanlık, tasarım ve uygulama hizmetleri",
      image: "/images/services-section.png",
    },
    order_index: 3,
  },
]

export default function HomeContentPage() {
  const handleSave = (content: any) => {
    console.log("Saving home page content:", content)
    // Here you would typically save to your backend
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ana Sayfa İçerik Yönetimi</h1>
        <p className="text-muted-foreground">Ana sayfa içeriklerini düzenleyin</p>
      </div>

      <div className="grid gap-6">
        {mockContentBlocks.map((block) => (
          <Card key={block.id}>
            <CardHeader>
              <CardTitle>{block.title}</CardTitle>
              <CardDescription>{block.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentEditor initialContent={block.content} blockId={block.id} userId="admin" />
            </CardContent>
          </Card>
        ))}
      </div>

      <ContentEditor page="home" onSave={handleSave} />
    </div>
  )
}
