"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, Calendar, Eye, Trash2, Reply, Archive } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  priority: "low" | "medium" | "high"
  createdAt: string
  readAt?: string
  repliedAt?: string
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      phone: "0532 123 45 67",
      subject: "Banyo Tasarımı Talebi",
      message: "Merhaba, 15 m² banyo alanım için tasarım hizmeti almak istiyorum. Detaylı bilgi alabilir miyim?",
      status: "new",
      priority: "high",
      createdAt: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      name: "Elif Kaya",
      email: "elif@example.com",
      phone: "0533 987 65 43",
      subject: "Salon Dekorasyonu",
      message: "50 m² salon alanım var. Modern bir tasarım istiyorum. Fiyat bilgisi alabilir miyim?",
      status: "read",
      priority: "medium",
      createdAt: "2024-01-19T14:15:00Z",
      readAt: "2024-01-19T15:00:00Z",
    },
    {
      id: "3",
      name: "Mehmet Özkan",
      email: "mehmet@example.com",
      subject: "Ofis Tasarımı",
      message: "Yeni açacağım ofisim için iç mimarlık hizmeti almak istiyorum. Randevu alabilir miyiz?",
      status: "replied",
      priority: "medium",
      createdAt: "2024-01-18T09:45:00Z",
      readAt: "2024-01-18T10:00:00Z",
      repliedAt: "2024-01-18T11:30:00Z",
    },
    {
      id: "4",
      name: "Ayşe Demir",
      email: "ayse@example.com",
      phone: "0534 555 44 33",
      subject: "Mutfak Yenileme",
      message: "Mutfağımı yenilemek istiyorum. Hangi hizmetleri veriyorsunuz?",
      status: "archived",
      priority: "low",
      createdAt: "2024-01-17T16:20:00Z",
      readAt: "2024-01-17T17:00:00Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || message.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || message.priority === selectedPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-yellow-100 text-yellow-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Yeni"
      case "read":
        return "Okundu"
      case "replied":
        return "Yanıtlandı"
      case "archived":
        return "Arşivlendi"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Yüksek"
      case "medium":
        return "Orta"
      case "low":
        return "Düşük"
      default:
        return priority
    }
  }

  const handleStatusChange = (messageId: string, newStatus: Message["status"]) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              status: newStatus,
              readAt: newStatus === "read" && !msg.readAt ? new Date().toISOString() : msg.readAt,
              repliedAt: newStatus === "replied" ? new Date().toISOString() : msg.repliedAt,
            }
          : msg,
      ),
    )
    toast.success("Mesaj durumu güncellendi!")
  }

  const handleDeleteMessage = (messageId: string) => {
    if (confirm("Bu mesajı silmek istediğinizden emin misiniz?")) {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
      setSelectedMessage(null)
      toast.success("Mesaj silindi!")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const stats = {
    total: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
    archived: messages.filter((m) => m.status === "archived").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mesajlar</h1>
          <p className="text-gray-600 mt-2">Gelen mesajları görüntüleyin ve yönetin</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Yeni</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Okundu</p>
                <p className="text-2xl font-bold">{stats.read}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Yanıtlandı</p>
                <p className="text-2xl font-bold">{stats.replied}</p>
              </div>
              <Reply className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Arşivlendi</p>
                <p className="text-2xl font-bold">{stats.archived}</p>
              </div>
              <Archive className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Mesaj ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="new">Yeni</option>
                    <option value="read">Okundu</option>
                    <option value="replied">Yanıtlandı</option>
                    <option value="archived">Arşivlendi</option>
                  </select>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tüm Öncelikler</option>
                    <option value="high">Yüksek</option>
                    <option value="medium">Orta</option>
                    <option value="low">Düşük</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id ? "ring-2 ring-blue-500" : ""
                } ${message.status === "new" ? "bg-blue-50" : ""}`}
                onClick={() => {
                  setSelectedMessage(message)
                  if (message.status === "new") {
                    handleStatusChange(message.id, "read")
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{message.name}</h3>
                        <Badge className={getStatusColor(message.status)}>{getStatusText(message.status)}</Badge>
                        <Badge className={getPriorityColor(message.priority)}>
                          {getPriorityText(message.priority)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                      <p className="font-medium text-gray-900 mb-2 truncate">{message.subject}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(message.createdAt)}
                        </div>
                        {message.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {message.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredMessages.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Mesaj bulunamadı</h3>
                  <p className="mt-2 text-gray-600">
                    {searchTerm || selectedStatus !== "all" || selectedPriority !== "all"
                      ? "Arama kriterlerinize uygun mesaj bulunamadı."
                      : "Henüz hiç mesaj alınmamış."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="space-y-4">
          {selectedMessage ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Mesaj Detayı</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedMessage.id, "replied")}
                        disabled={selectedMessage.status === "replied"}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Yanıtla
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedMessage.id, "archived")}
                        disabled={selectedMessage.status === "archived"}
                      >
                        <Archive className="h-4 w-4 mr-1" />
                        Arşivle
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteMessage(selectedMessage.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Gönderen</Label>
                      <p className="font-semibold">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">E-posta</Label>
                      <p>{selectedMessage.email}</p>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Telefon</Label>
                        <p>{selectedMessage.phone}</p>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Konu</Label>
                      <p className="font-medium">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Durum</Label>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getStatusColor(selectedMessage.status)}>
                          {getStatusText(selectedMessage.status)}
                        </Badge>
                        <Badge className={getPriorityColor(selectedMessage.priority)}>
                          {getPriorityText(selectedMessage.priority)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Gönderim Tarihi</Label>
                      <p>{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                    {selectedMessage.readAt && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Okunma Tarihi</Label>
                        <p>{formatDate(selectedMessage.readAt)}</p>
                      </div>
                    )}
                    {selectedMessage.repliedAt && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Yanıtlanma Tarihi</Label>
                        <p>{formatDate(selectedMessage.repliedAt)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mesaj İçeriği</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hızlı Yanıt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Yanıt Mesajı</Label>
                    <textarea
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={6}
                      placeholder="Yanıtınızı buraya yazın..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Reply className="h-4 w-4 mr-2" />
                      Yanıt Gönder
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      E-posta Gönder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Mesaj Seçin</h3>
                <p className="mt-2 text-gray-600">Detaylarını görmek için bir mesaj seçin</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
