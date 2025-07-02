"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Eye, Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface PageContent {
  id: string
  page_slug: string
  section_key: string
  content_type: string
  content: any
  metadata?: any
}

interface HomePageEditorProps {
  initialContents: PageContent[]
  userId: string
}

export default function HomePageEditor({ initialContents, userId }: HomePageEditorProps) {
  const [contents, setContents] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // İçerikleri organize et
    const organized = initialContents.reduce(
      (acc, item) => {
        acc[item.section_key] = item.content
        return acc
      },
      {} as Record<string, any>,
    )
    setContents(organized)
  }, [initialContents])

  const updateContent = (sectionKey: string, value: any) => {
    setContents((prev) => ({
      ...prev,
      [sectionKey]: value,
    }))
  }

  const saveContent = async (sectionKey: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/page-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_slug: "home",
          section_key: sectionKey,
          content: contents[sectionKey],
          content_type: getContentType(sectionKey),
          user_id: userId,
        }),
      })

      if (response.ok) {
        toast.success("İçerik başarıyla kaydedildi!")
      } else {
        toast.error("İçerik kaydedilirken hata oluştu")
      }
    } catch (error) {
      toast.error("Bağlantı hatası")
    } finally {
      setIsLoading(false)
    }
  }

  const saveAllContent = async () => {
    setIsLoading(true)
    try {
      const promises = Object.keys(contents).map((sectionKey) =>
        fetch("/api/admin/page-content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page_slug: "home",
            section_key: sectionKey,
            content: contents[sectionKey],
            content_type: getContentType(sectionKey),
            user_id: userId,
          }),
        }),
      )

      await Promise.all(promises)
      toast.success("Tüm içerikler başarıyla kaydedildi!")
    } catch (error) {
      toast.error("İçerikler kaydedilirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getContentType = (sectionKey: string) => {
    if (sectionKey.includes("image") || sectionKey.includes("gallery")) return "IMAGE"
    if (sectionKey.includes("description") || sectionKey.includes("content")) return "RICH_TEXT"
    return "TEXT"
  }

  const handleImageUpload = async (sectionKey: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("section", sectionKey)

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        updateContent(sectionKey, {
          ...contents[sectionKey],
          url,
          alt: contents[sectionKey]?.alt || { tr: "", en: "" },
        })
        toast.success("Görsel başarıyla yüklendi!")
      }
    } catch (error) {
      toast.error("Görsel yüklenirken hata oluştu")
    }
  }

  return (
    <div className="space-y-6">
      {/* Üst Kontroller */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {previewMode ? "Düzenleme Modu" : "Önizleme"}
          </Button>
        </div>

        <Button onClick={saveAllContent} disabled={isLoading} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {isLoading ? "Kaydediliyor..." : "Tümünü Kaydet"}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="text">Metin</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="second-gallery">İkinci Galeri</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Bölümü</CardTitle>
              <CardDescription>Ana sayfa hero bölümünü düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Title */}
              <div className="space-y-2">
                <Label>Ana Başlık</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Input
                      value={contents.hero_title?.tr || ""}
                      onChange={(e) =>
                        updateContent("hero_title", {
                          ...contents.hero_title,
                          tr: e.target.value,
                        })
                      }
                      placeholder="SHINEST"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Input
                      value={contents.hero_title?.en || ""}
                      onChange={(e) =>
                        updateContent("hero_title", {
                          ...contents.hero_title,
                          en: e.target.value,
                        })
                      }
                      placeholder="SHINEST"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Subtitle */}
              <div className="space-y-2">
                <Label>Alt Başlık</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Input
                      value={contents.hero_subtitle?.tr || ""}
                      onChange={(e) =>
                        updateContent("hero_subtitle", {
                          ...contents.hero_subtitle,
                          tr: e.target.value,
                        })
                      }
                      placeholder="İÇ MİMARLIK"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Input
                      value={contents.hero_subtitle?.en || ""}
                      onChange={(e) =>
                        updateContent("hero_subtitle", {
                          ...contents.hero_subtitle,
                          en: e.target.value,
                        })
                      }
                      placeholder="INTERIOR ARCHITECTURE"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="space-y-2">
                <Label>Hero Görseli</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {contents.hero_image?.url ? (
                    <div className="relative">
                      <div className="relative h-48 w-full">
                        <Image
                          src={contents.hero_image.url || "/placeholder.svg"}
                          alt="Hero Image"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => updateContent("hero_image", { url: "", alt: { tr: "", en: "" } })}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="hero-image" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">Hero görseli yükleyin</span>
                          <input
                            id="hero-image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload("hero_image", file)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button onClick={() => saveContent("hero_title")} disabled={isLoading}>
                Hero Bölümünü Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Section */}
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Ana Galeri</CardTitle>
              <CardDescription>Scroll galeri görsellerini yönetin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {contents.gallery_images?.images?.map((image: any, index: number) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 w-full">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt?.tr || ""}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        const newImages = contents.gallery_images.images.filter((_: any, i: number) => i !== index)
                        updateContent("gallery_images", { images: newImages })
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {/* Add New Image */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                  <label htmlFor="gallery-image" className="cursor-pointer text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-xs text-gray-500">Görsel Ekle</span>
                    <input
                      id="gallery-image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // Handle gallery image upload
                          handleImageUpload("gallery_new", file)
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <Button onClick={() => saveContent("gallery_images")} disabled={isLoading} className="mt-4">
                Galeri Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Section */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Metin Bölümü</CardTitle>
              <CardDescription>Ana sayfa büyük metin bölümünü düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Text Main 1 */}
              <div className="space-y-2">
                <Label>Ana Metin 1</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Input
                      value={contents.text_main1?.tr || ""}
                      onChange={(e) =>
                        updateContent("text_main1", {
                          ...contents.text_main1,
                          tr: e.target.value,
                        })
                      }
                      placeholder="MEKANLARINIZ"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Input
                      value={contents.text_main1?.en || ""}
                      onChange={(e) =>
                        updateContent("text_main1", {
                          ...contents.text_main1,
                          en: e.target.value,
                        })
                      }
                      placeholder="YOUR SPACES"
                    />
                  </div>
                </div>
              </div>

              {/* Text Main 2 */}
              <div className="space-y-2">
                <Label>Ana Metin 2</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Input
                      value={contents.text_main2?.tr || ""}
                      onChange={(e) =>
                        updateContent("text_main2", {
                          ...contents.text_main2,
                          tr: e.target.value,
                        })
                      }
                      placeholder="YAŞAMINIZA"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Input
                      value={contents.text_main2?.en || ""}
                      onChange={(e) =>
                        updateContent("text_main2", {
                          ...contents.text_main2,
                          en: e.target.value,
                        })
                      }
                      placeholder="BRING LIGHT TO"
                    />
                  </div>
                </div>
              </div>

              {/* Handwriting Text */}
              <div className="space-y-2">
                <Label>El Yazısı Metin</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Input
                      value={contents.text_handwriting?.tr || ""}
                      onChange={(e) =>
                        updateContent("text_handwriting", {
                          ...contents.text_handwriting,
                          tr: e.target.value,
                        })
                      }
                      placeholder="ışık tutar!"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Input
                      value={contents.text_handwriting?.en || ""}
                      onChange={(e) =>
                        updateContent("text_handwriting", {
                          ...contents.text_handwriting,
                          en: e.target.value,
                        })
                      }
                      placeholder="your life!"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Açıklama Metni</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Textarea
                      value={contents.text_description?.tr || ""}
                      onChange={(e) =>
                        updateContent("text_description", {
                          ...contents.text_description,
                          tr: e.target.value,
                        })
                      }
                      placeholder="SHINEST İç Mimarlık açıklaması..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Textarea
                      value={contents.text_description?.en || ""}
                      onChange={(e) =>
                        updateContent("text_description", {
                          ...contents.text_description,
                          en: e.target.value,
                        })
                      }
                      placeholder="SHINEST Interior Architecture description..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => saveContent("text_main1")} disabled={isLoading}>
                Metin Bölümünü Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Hakkımızda Bölümü</CardTitle>
              <CardDescription>Ana sayfa hakkımızda bölümünü düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hakkımızda Açıklaması</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">Türkçe</Label>
                    <Textarea
                      value={contents.about_description?.tr || ""}
                      onChange={(e) =>
                        updateContent("about_description", {
                          ...contents.about_description,
                          tr: e.target.value,
                        })
                      }
                      placeholder="Yaşam alanlarınızı sanat eserine dönüştürüyoruz..."
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">İngilizce</Label>
                    <Textarea
                      value={contents.about_description?.en || ""}
                      onChange={(e) =>
                        updateContent("about_description", {
                          ...contents.about_description,
                          en: e.target.value,
                        })
                      }
                      placeholder="We transform your living spaces into works of art..."
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => saveContent("about_description")} disabled={isLoading}>
                Hakkımızda Bölümünü Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Second Gallery */}
        <TabsContent value="second-gallery">
          <Card>
            <CardHeader>
              <CardTitle>İkinci Galeri</CardTitle>
              <CardDescription>İkinci galeri bölümünü yönetin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {contents.second_gallery?.images?.map((image: any, index: number) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 w-full">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt?.tr || ""}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        const newImages = contents.second_gallery.images.filter((_: any, i: number) => i !== index)
                        updateContent("second_gallery", { images: newImages })
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={() => saveContent("second_gallery")} disabled={isLoading} className="mt-4">
                İkinci Galeri Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
