"use client"

import React from "react"

import { useState, useCallback } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, GripVertical, ImageIcon, Type, Quote, Grid3X3, Trash2, Eye, Save, Upload, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  onSave?: (sections: ContentSection[]) => void
}) {
  const [sections, setSections] = useState<ContentSection[]>(initialSections)
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

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

  const handleSave = () => {
    onSave?.(sections)
  }

  const handleImageUpload = async (file: File, sectionId: string, field: string) => {
    // Simulate image upload
    const imageUrl = URL.createObjectURL(file)
    const section = sections.find((s) => s.id === sectionId)
    if (section) {
      updateSection(sectionId, {
        content: {
          ...section.content,
          [field]: imageUrl,
        },
      })
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
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Kaydet
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
            onImageUpload={handleImageUpload}
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
  onImageUpload,
  previewMode,
}: {
  section: ContentSection
  onUpdate: (updates: Partial<ContentSection>) => void
  onImageUpload: (file: File, sectionId: string, field: string) => void
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

      {section.type === "hero" && <HeroEditor section={section} onUpdate={onUpdate} onImageUpload={onImageUpload} />}

      {section.type === "text" && <TextEditor section={section} onUpdate={onUpdate} />}

      {section.type === "gallery" && (
        <GalleryEditor section={section} onUpdate={onUpdate} onImageUpload={onImageUpload} />
      )}

      {section.type === "quote" && <QuoteEditor section={section} onUpdate={onUpdate} />}

      {section.type === "services" && (
        <ServicesEditor section={section} onUpdate={onUpdate} onImageUpload={onImageUpload} />
      )}
    </div>
  )
}

function HeroEditor({ section, onUpdate, onImageUpload }: any) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Ana Başlık</Label>
        <Input
          value={section.content.title || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, title: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>Alt Başlık</Label>
        <Input
          value={section.content.subtitle || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, subtitle: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>Açıklama</Label>
        <Textarea
          value={section.content.description || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, description: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>Arka Plan Görseli</Label>
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onImageUpload(file, section.id, "backgroundImage")
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
    </div>
  )
}

function TextEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Başlık</Label>
        <Input
          value={section.content.title || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, title: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>İçerik</Label>
        <Textarea
          rows={8}
          value={section.content.text || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, text: e.target.value },
            })
          }
        />
      </div>
    </div>
  )
}

function GalleryEditor({ section, onUpdate, onImageUpload }: any) {
  const images = section.content.images || []

  const addImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    onUpdate({
      content: {
        ...section.content,
        images: [...images, { url: imageUrl, alt: file.name }],
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Galeri Başlığı</Label>
        <Input
          value={section.content.title || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, title: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>Görseller</Label>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {images.map((image: any, index: number) => (
            <div key={index} className="relative">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1"
                onClick={() => {
                  const newImages = images.filter((_: any, i: number) => i !== index)
                  onUpdate({
                    content: { ...section.content, images: newImages },
                  })
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                files.forEach(addImage)
              }}
              className="hidden"
              id="gallery-upload"
            />
            <label htmlFor="gallery-upload" className="cursor-pointer">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">Görsel Ekle</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuoteEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Alıntı Metni</Label>
        <Textarea
          value={section.content.quote || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, quote: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>Yazar</Label>
        <Input
          value={section.content.author || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, author: e.target.value },
            })
          }
        />
      </div>
      <div>
        <Label>Pozisyon</Label>
        <Input
          value={section.content.position || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, position: e.target.value },
            })
          }
        />
      </div>
    </div>
  )
}

function ServicesEditor({ section, onUpdate, onImageUpload }: any) {
  const services = section.content.services || []

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: "Yeni Hizmet",
      description: "",
      image: "",
      features: [],
    }
    onUpdate({
      content: {
        ...section.content,
        services: [...services, newService],
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Bölüm Başlığı</Label>
        <Input
          value={section.content.title || ""}
          onChange={(e) =>
            onUpdate({
              content: { ...section.content, title: e.target.value },
            })
          }
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label>Hizmetler</Label>
          <Button onClick={addService} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Hizmet Ekle
          </Button>
        </div>
        <div className="mt-2 space-y-4">
          {services.map((service: any, index: number) => (
            <Card key={service.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Hizmet Başlığı"
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...services]
                      newServices[index].title = e.target.value
                      onUpdate({
                        content: { ...section.content, services: newServices },
                      })
                    }}
                  />
                  <Textarea
                    placeholder="Hizmet Açıklaması"
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...services]
                      newServices[index].description = e.target.value
                      onUpdate({
                        content: { ...section.content, services: newServices },
                      })
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newServices = services.filter((_: any, i: number) => i !== index)
                      onUpdate({
                        content: { ...section.content, services: newServices },
                      })
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
          <h1 className="text-3xl font-bold mb-2">{section.content.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{section.content.subtitle}</h2>
          <p className="text-gray-700">{section.content.description}</p>
        </div>
      )}

      {section.type === "text" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{section.content.title}</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{section.content.text}</p>
        </div>
      )}

      {section.type === "gallery" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{section.content.title}</h2>
          <div className="grid grid-cols-3 gap-4">
            {section.content.images?.map((image: any, index: number) => (
              <img
                key={index}
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {section.type === "quote" && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <blockquote className="text-xl italic mb-4">"{section.content.quote}"</blockquote>
          <cite className="text-gray-600">
            — {section.content.author}, {section.content.position}
          </cite>
        </div>
      )}

      {section.type === "services" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{section.content.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.content.services?.map((service: any, index: number) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
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
        title: "Ana Başlık",
        subtitle: "Alt Başlık",
        description: "Açıklama metni",
        backgroundImage: "",
      }
    case "text":
      return {
        title: "Metin Başlığı",
        text: "Metin içeriği",
      }
    case "gallery":
      return {
        title: "Galeri Başlığı",
        images: [],
      }
    case "quote":
      return {
        quote: "Alıntı metni",
        author: "Yazar",
        position: "Pozisyon",
      }
    case "services":
      return {
        title: "Hizmetlerimiz",
        services: [],
      }
    default:
      return {}
  }
}

export default ContentEditor
