"use client"

import React from "react"
import { useState, useCallback } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, GripVertical, ImageIcon, Type, Quote, Grid3X3, Trash2, Eye, Save, Settings, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ContentSection {
  id: string
  type: "hero" | "text" | "gallery" | "quote" | "services"
  title: string
  content: any
  order: number
}

const sectionTypes = [
  { value: "hero", label: "Hero Bölümü", icon: ImageIcon },
  { value: "text", label: "Metin Bölümü", icon: Type },
  { value: "gallery", label: "Galeri", icon: Grid3X3 },
  { value: "quote", label: "Alıntı", icon: Quote },
  { value: "services", label: "Hizmetler", icon: Settings },
]

export function ContentEditor({
  initialSections = [],
  onSave,
}: {
  initialSections?: ContentSection[]
  onSave?: (sections: ContentSection[]) => Promise<void>
}) {
  const [sections, setSections] = useState<ContentSection[]>(initialSections)
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Sync initialSections prop with internal state
  React.useEffect(() => {
    setSections(initialSections)
  }, [initialSections])

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const items = Array.from(sections)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      // Update order
      const updatedItems = items.map((item, index) => ({
        ...item,
        order: index,
      }))

      setSections(updatedItems)
    },
    [sections],
  )

  const addSection = (type: ContentSection["type"]) => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      type,
      title: `Yeni ${sectionTypes.find((t) => t.value === type)?.label}`,
      content: getDefaultContent(type),
      order: sections.length,
    }
    setSections([...sections, newSection])
    setSelectedSection(newSection.id)
  }

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, ...updates } : section)))
  }

  const deleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
    if (selectedSection === id) {
      setSelectedSection(null)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave?.(sections)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Panel - Section List */}
      <div className="w-80 border-r border-gray-200 bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">İçerik Bölümleri</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-1" />
                {previewMode ? "Düzenle" : "Önizle"}
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </div>

          {/* Add Section Dropdown */}
          <Select onValueChange={(value) => addSection(value as ContentSection["type"])}>
            <SelectTrigger>
              <SelectValue placeholder="Bölüm Ekle" />
            </SelectTrigger>
            <SelectContent>
              {sectionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center space-x-2">
                    <type.icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sections List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 space-y-2">
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`cursor-pointer transition-all ${
                          selectedSection === section.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                        } ${snapshot.isDragging ? "shadow-lg" : ""}`}
                        onClick={() => setSelectedSection(section.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                {sectionTypes.find((t) => t.value === section.type)?.icon && (
                                  <div className="w-4 h-4">
                                    {React.createElement(sectionTypes.find((t) => t.value === section.type)!.icon, {
                                      className: "w-4 h-4 text-gray-600",
                                    })}
                                  </div>
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  {sectionTypes.find((t) => t.value === section.type)?.label}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-gray-900 truncate mt-1">{section.title}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteSection(section.id)
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Right Panel - Section Editor */}
      <div className="flex-1 p-6">
        {selectedSection ? (
          <SectionEditor
            section={sections.find((s) => s.id === selectedSection)!}
            onUpdate={(updates) => updateSection(selectedSection, updates)}
            previewMode={previewMode}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Grid3X3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Düzenlemek için bir bölüm seçin</p>
              <p className="text-sm">Sol panelden bir bölüm seçin veya yeni bölüm ekleyin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionEditor({
  section,
  onUpdate,
  previewMode,
}: {
  section: ContentSection
  onUpdate: (updates: Partial<ContentSection>) => void
  previewMode: boolean
}) {
  if (previewMode) {
    return <SectionPreview section={section} />
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="section-title">Bölüm Başlığı</Label>
        <Input
          id="section-title"
          value={section.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
        />
      </div>

      {section.type === "hero" && <HeroEditor section={section} onUpdate={onUpdate} />}

      {section.type === "text" && <TextEditor section={section} onUpdate={onUpdate} />}

      {section.type === "gallery" && <GalleryEditor section={section} onUpdate={onUpdate} />}

      {section.type === "quote" && <QuoteEditor section={section} onUpdate={onUpdate} />}

      {section.type === "services" && <ServicesEditor section={section} onUpdate={onUpdate} />}
    </div>
  )
}

function HeroEditor({ section, onUpdate }: any) {
  const updateContentField = (field: string, value: any, lang?: string) => {
    onUpdate({
      content: {
        ...section.content,
        [field]: lang ? { ...section.content[field], [lang]: value } : value,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Ana Başlık (TR)</Label>
        <Input
          value={section.content.title?.tr || ""}
          onChange={(e) => updateContentField("title", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Ana Başlık (EN)</Label>
        <Input
          value={section.content.title?.en || ""}
          onChange={(e) => updateContentField("title", e.target.value, "en")}
        />
      </div>
      <div>
        <Label>Alt Başlık (TR)</Label>
        <Input
          value={section.content.subtitle?.tr || ""}
          onChange={(e) => updateContentField("subtitle", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Alt Başlık (EN)</Label>
        <Input
          value={section.content.subtitle?.en || ""}
          onChange={(e) => updateContentField("subtitle", e.target.value, "en")}
        />
      </div>
      <div>
        <Label>Açıklama (TR)</Label>
        <Textarea
          value={section.content.description?.tr || ""}
          onChange={(e) => updateContentField("description", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Açıklama (EN)</Label>
        <Textarea
          value={section.content.description?.en || ""}
          onChange={(e) => updateContentField("description", e.target.value, "en")}
        />
      </div>
      <div>
        <Label>Buton Metni (TR)</Label>
        <Input
          value={section.content.buttonText?.tr || ""}
          onChange={(e) => updateContentField("buttonText", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Buton Metni (EN)</Label>
        <Input
          value={section.content.buttonText?.en || ""}
          onChange={(e) => updateContentField("buttonText", e.target.value, "en")}
        />
      </div>
      <div>
        <Label>Arka Plan Görseli URL (public/images/hero-image.png gibi)</Label>
        <Input
          value={section.content.backgroundImage || ""}
          onChange={(e) => updateContentField("backgroundImage", e.target.value)}
          placeholder="/images/hero-image.png"
        />
        {section.content.backgroundImage && (
          <img
            src={section.content.backgroundImage || "/placeholder.svg"}
            alt="Background Preview"
            className="mt-2 h-24 object-cover rounded-md"
          />
        )}
        <p className="text-sm text-muted-foreground mt-1">Görseli `public` klasörüne yükleyip buraya yolunu girin.</p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={section.content.showAnimation || false}
          onCheckedChange={(checked) => updateContentField("showAnimation", checked)}
          id="show-animation"
        />
        <Label htmlFor="show-animation">Animasyon Göster</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={section.content.isVisible || false}
          onCheckedChange={(checked) => updateContentField("isVisible", checked)}
          id="hero-is-visible"
        />
        <Label htmlFor="hero-is-visible">Bölümü Görünür Yap</Label>
      </div>
    </div>
  )
}

function TextEditor({ section, onUpdate }: any) {
  const updateContentField = (field: string, value: any, lang?: string) => {
    onUpdate({
      content: {
        ...section.content,
        [field]: lang ? { ...section.content[field], [lang]: value } : value,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Başlık (TR)</Label>
        <Input
          value={section.content.title?.tr || ""}
          onChange={(e) => updateContentField("title", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Başlık (EN)</Label>
        <Input
          value={section.content.title?.en || ""}
          onChange={(e) => updateContentField("title", e.target.value, "en")}
        />
      </div>
      {section.content.mainText1 !== undefined && ( // Specific for "Büyük Metin" section
        <>
          <div>
            <Label>Ana Metin 1 (TR)</Label>
            <Input
              value={section.content.mainText1?.tr || ""}
              onChange={(e) => updateContentField("mainText1", e.target.value, "tr")}
            />
          </div>
          <div>
            <Label>Ana Metin 1 (EN)</Label>
            <Input
              value={section.content.mainText1?.en || ""}
              onChange={(e) => updateContentField("mainText1", e.target.value, "en")}
            />
          </div>
          <div>
            <Label>Ana Metin 2 (TR)</Label>
            <Input
              value={section.content.mainText2?.tr || ""}
              onChange={(e) => updateContentField("mainText2", e.target.value, "tr")}
            />
          </div>
          <div>
            <Label>Ana Metin 2 (EN)</Label>
            <Input
              value={section.content.mainText2?.en || ""}
              onChange={(e) => updateContentField("mainText2", e.target.value, "en")}
            />
          </div>
          <div>
            <Label>El Yazısı Metin (TR)</Label>
            <Input
              value={section.content.handwritingText?.tr || ""}
              onChange={(e) => updateContentField("handwritingText", e.target.value, "tr")}
            />
          </div>
          <div>
            <Label>El Yazısı Metin (EN)</Label>
            <Input
              value={section.content.handwritingText?.en || ""}
              onChange={(e) => updateContentField("handwritingText", e.target.value, "en")}
            />
          </div>
        </>
      )}
      <div>
        <Label>İçerik (TR)</Label>
        <Textarea
          rows={8}
          value={section.content.text?.tr || ""}
          onChange={(e) => updateContentField("text", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>İçerik (EN)</Label>
        <Textarea
          rows={8}
          value={section.content.text?.en || ""}
          onChange={(e) => updateContentField("text", e.target.value, "en")}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={section.content.isVisible || false}
          onCheckedChange={(checked) => updateContentField("isVisible", checked)}
          id="text-is-visible"
        />
        <Label htmlFor="text-is-visible">Bölümü Görünür Yap</Label>
      </div>
    </div>
  )
}

function GalleryEditor({ section, onUpdate }: any) {
  const images = section.content.images || []

  const addImage = () => {
    onUpdate({
      content: {
        ...section.content,
        images: [
          ...images,
          { id: Date.now().toString(), url: "/placeholder.svg", alt: { tr: "Yeni Görsel", en: "New Image" } },
        ],
      },
    })
  }

  const updateImage = (id: string, field: string, value: any, lang?: string) => {
    const newImages = images.map((img: any) =>
      img.id === id ? { ...img, [field]: lang ? { ...img[field], [lang]: value } : value } : img,
    )
    onUpdate({
      content: { ...section.content, images: newImages },
    })
  }

  const deleteImage = (id: string) => {
    const newImages = images.filter((img: any) => img.id !== id)
    onUpdate({
      content: { ...section.content, images: newImages },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Galeri Başlığı (TR)</Label>
        <Input
          value={section.content.title?.tr || ""}
          onChange={(e) =>
            onUpdate({ content: { ...section.content, title: { ...section.content.title, tr: e.target.value } } })
          }
        />
      </div>
      <div>
        <Label>Galeri Başlığı (EN)</Label>
        <Input
          value={section.content.title?.en || ""}
          onChange={(e) =>
            onUpdate({ content: { ...section.content, title: { ...section.content.title, en: e.target.value } } })
          }
        />
      </div>
      <div>
        <Label>Görseller</Label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image: any) => (
            <Card key={image.id}>
              <CardContent className="p-4 space-y-3">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt?.tr || "Galeri Görseli"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Label>Görsel URL</Label>
                  <Input
                    value={image.url || ""}
                    onChange={(e) => updateImage(image.id, "url", e.target.value)}
                    placeholder="/images/gallery-1.png"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Görseli `public` klasörüne yükleyip buraya yolunu girin.
                  </p>
                </div>
                <div>
                  <Label>Alt Metin (TR)</Label>
                  <Input
                    value={image.alt?.tr || ""}
                    onChange={(e) => updateImage(image.id, "alt", e.target.value, "tr")}
                  />
                </div>
                <div>
                  <Label>Alt Metin (EN)</Label>
                  <Input
                    value={image.alt?.en || ""}
                    onChange={(e) => updateImage(image.id, "alt", e.target.value, "en")}
                  />
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteImage(image.id)} className="w-full">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Sil
                </Button>
              </CardContent>
            </Card>
          ))}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center flex items-center justify-center">
            <Button variant="outline" onClick={addImage}>
              <Plus className="w-4 h-4 mr-2" />
              Görsel Ekle
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={section.content.isVisible || false}
          onCheckedChange={(checked) => onUpdate({ content: { ...section.content, isVisible: checked } })}
          id="gallery-is-visible"
        />
        <Label htmlFor="gallery-is-visible">Bölümü Görünür Yap</Label>
      </div>
    </div>
  )
}

function QuoteEditor({ section, onUpdate }: any) {
  const updateContentField = (field: string, value: any, lang?: string) => {
    onUpdate({
      content: {
        ...section.content,
        [field]: lang ? { ...section.content[field], [lang]: value } : value,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Alıntı Metni (TR)</Label>
        <Textarea
          value={section.content.quote?.tr || ""}
          onChange={(e) => updateContentField("quote", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Alıntı Metni (EN)</Label>
        <Textarea
          value={section.content.quote?.en || ""}
          onChange={(e) => updateContentField("quote", e.target.value, "en")}
        />
      </div>
      <div>
        <Label>Yazar (TR)</Label>
        <Input
          value={section.content.author?.tr || ""}
          onChange={(e) => updateContentField("author", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Yazar (EN)</Label>
        <Input
          value={section.content.author?.en || ""}
          onChange={(e) => updateContentField("author", e.target.value, "en")}
        />
      </div>
      <div>
        <Label>Pozisyon (TR)</Label>
        <Input
          value={section.content.position?.tr || ""}
          onChange={(e) => updateContentField("position", e.target.value, "tr")}
        />
      </div>
      <div>
        <Label>Pozisyon (EN)</Label>
        <Input
          value={section.content.position?.en || ""}
          onChange={(e) => updateContentField("position", e.target.value, "en")}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={section.content.isVisible || false}
          onCheckedChange={(checked) => updateContentField("isVisible", checked)}
          id="quote-is-visible"
        />
        <Label htmlFor="quote-is-visible">Bölümü Görünür Yap</Label>
      </div>
    </div>
  )
}

function ServicesEditor({ section, onUpdate }: any) {
  const services = section.content.services || []

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: { tr: "Yeni Hizmet", en: "New Service" },
      description: { tr: "", en: "" },
      image: "/placeholder.svg",
    }
    onUpdate({
      content: {
        ...section.content,
        services: [...services, newService],
      },
    })
  }

  const updateService = (serviceId: string, field: string, value: any, lang?: string) => {
    const newServices = services.map((s: any) =>
      s.id === serviceId ? { ...s, [field]: lang ? { ...s[field], [lang]: value } : value } : s,
    )
    onUpdate({
      content: { ...section.content, services: newServices },
    })
  }

  const deleteService = (serviceId: string) => {
    const newServices = services.filter((s: any) => s.id !== serviceId)
    onUpdate({
      content: { ...section.content, services: newServices },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Bölüm Başlığı (TR)</Label>
        <Input
          value={section.content.title?.tr || ""}
          onChange={(e) =>
            onUpdate({ content: { ...section.content, title: { ...section.content.title, tr: e.target.value } } })
          }
        />
      </div>
      <div>
        <Label>Bölüm Başlığı (EN)</Label>
        <Input
          value={section.content.title?.en || ""}
          onChange={(e) =>
            onUpdate({ content: { ...section.content, title: { ...section.content.title, en: e.target.value } } })
          }
        />
      </div>
      <div>
        <Label>Alt Başlık (TR)</Label>
        <Textarea
          value={section.content.subtitle?.tr || ""}
          onChange={(e) =>
            onUpdate({ content: { ...section.content, subtitle: { ...section.content.subtitle, tr: e.target.value } } })
          }
          rows={3}
        />
      </div>
      <div>
        <Label>Alt Başlık (EN)</Label>
        <Textarea
          value={section.content.subtitle?.en || ""}
          onChange={(e) =>
            onUpdate({ content: { ...section.content, subtitle: { ...section.content.subtitle, en: e.target.value } } })
          }
          rows={3}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Hizmetler</Label>
          <Button onClick={addService} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Hizmet Ekle
          </Button>
        </div>
        <div className="mt-2 space-y-4">
          {services.map((service: any) => (
            <Card key={service.id}>
              <CardContent className="p-4 space-y-3">
                <div>
                  <Label>Başlık (TR)</Label>
                  <Input
                    value={service.title?.tr || ""}
                    onChange={(e) => updateService(service.id, "title", e.target.value, "tr")}
                  />
                </div>
                <div>
                  <Label>Başlık (EN)</Label>
                  <Input
                    value={service.title?.en || ""}
                    onChange={(e) => updateService(service.id, "title", e.target.value, "en")}
                  />
                </div>
                <div>
                  <Label>Açıklama (TR)</Label>
                  <Textarea
                    value={service.description?.tr || ""}
                    onChange={(e) => updateService(service.id, "description", e.target.value, "tr")}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Açıklama (EN)</Label>
                  <Textarea
                    value={service.description?.en || ""}
                    onChange={(e) => updateService(service.id, "description", e.target.value, "en")}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Görsel URL (public/images/consulting-service.png gibi)</Label>
                  <Input
                    value={service.image || ""}
                    onChange={(e) => updateService(service.id, "image", e.target.value)}
                    placeholder="/images/consulting-service.png"
                  />
                  {service.image && (
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt="Service Preview"
                      className="mt-2 h-16 object-cover rounded-md"
                    />
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Görseli `public` klasörüne yükleyip buraya yolunu girin.
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteService(service.id)} className="w-full">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Sil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={section.content.isVisible || false}
          onCheckedChange={(checked) => onUpdate({ content: { ...section.content, isVisible: checked } })}
          id="services-is-visible"
        />
        <Label htmlFor="services-is-visible">Bölümü Görünür Yap</Label>
      </div>
    </div>
  )
}

function SectionPreview({ section }: { section: ContentSection }) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">{section.title} - Önizleme</h3>

      {section.type === "hero" && (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-2">
            {section.content.title?.tr || section.content.title?.en || "Başlık"}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">
            {section.content.subtitle?.tr || section.content.subtitle?.en || "Alt Başlık"}
          </h2>
          <p className="text-gray-700">
            {section.content.description?.tr || section.content.description?.en || "Açıklama"}
          </p>
          {section.content.backgroundImage && (
            <img
              src={section.content.backgroundImage || "/placeholder.svg"}
              alt="Hero Background"
              className="mt-4 max-h-48 w-full object-cover rounded-md"
            />
          )}
        </div>
      )}

      {section.type === "text" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {section.content.title?.tr || section.content.title?.en || "Metin Başlığı"}
          </h2>
          {section.content.mainText1 && (
            <>
              <p className="text-xl font-bold">{section.content.mainText1?.tr || section.content.mainText1?.en}</p>
              <p className="text-xl font-bold">{section.content.mainText2?.tr || section.content.mainText2?.en}</p>
              <p className="text-xl font-bold text-yellow-600">
                {section.content.handwritingText?.tr || section.content.handwritingText?.en}
              </p>
            </>
          )}
          <p className="text-gray-700 whitespace-pre-wrap">
            {section.content.text?.tr || section.content.text?.en || "Metin içeriği"}
          </p>
        </div>
      )}

      {section.type === "gallery" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {section.content.title?.tr || section.content.title?.en || "Galeri Başlığı"}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {section.content.images?.map((image: any, index: number) => (
              <img
                key={index}
                src={image.url || "/placeholder.svg"}
                alt={image.alt?.tr || image.alt?.en || "Galeri Görseli"}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {section.type === "quote" && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <blockquote className="text-xl italic mb-4">
            "{section.content.quote?.tr || section.content.quote?.en || "Alıntı metni"}"
          </blockquote>
          <cite className="text-gray-600">
            — {section.content.author?.tr || section.content.author?.en || "Yazar"},{" "}
            {section.content.position?.tr || section.content.position?.en || "Pozisyon"}
          </cite>
        </div>
      )}

      {section.type === "services" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {section.content.title?.tr || section.content.title?.en || "Hizmetler Başlığı"}
          </h2>
          <p className="text-gray-600 mb-4">
            {section.content.subtitle?.tr || section.content.subtitle?.en || "Alt Başlık"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.content.services?.map((service: any, index: number) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{service.title?.tr || service.title?.en || "Hizmet Başlığı"}</h3>
                  <p className="text-gray-600 text-sm">
                    {service.description?.tr || service.description?.en || "Hizmet açıklaması"}
                  </p>
                  {service.image && (
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt="Service Preview"
                      className="mt-2 h-16 object-cover rounded-md"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function getDefaultContent(type: ContentSection["type"]) {
  switch (type) {
    case "hero":
      return {
        title: { tr: "Ana Başlık", en: "Main Title" },
        subtitle: { tr: "Alt Başlık", en: "Subtitle" },
        description: { tr: "Açıklama metni", en: "Description text" },
        buttonText: { tr: "Keşfet", en: "Explore" },
        backgroundImage: "/placeholder.svg?height=400&width=800",
        showAnimation: true,
        isVisible: true,
      }
    case "text":
      return {
        title: { tr: "Metin Başlığı", en: "Text Title" },
        text: { tr: "Metin içeriği", en: "Text content" },
        isVisible: true,
      }
    case "gallery":
      return {
        title: { tr: "Galeri Başlığı", en: "Gallery Title" },
        images: [],
        isVisible: true,
      }
    case "quote":
      return {
        quote: { tr: "Alıntı metni", en: "Quote text" },
        author: { tr: "Yazar", en: "Author" },
        position: { tr: "Pozisyon", en: "Position" },
        isVisible: true,
      }
    case "services":
      return {
        title: { tr: "Hizmetlerimiz", en: "Our Services" },
        subtitle: { tr: "Hizmetlerimizin alt başlığı", en: "Subtitle for our services" },
        services: [],
        isVisible: true,
      }
    default:
      return {}
  }
}

export default ContentEditor
