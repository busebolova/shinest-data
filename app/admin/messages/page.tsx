"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, MailOpen, Mail } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

// In-memory mock for messages
let mockMessages: Message[] = [
  {
    id: "1",
    name: "Ayşe Yılmaz",
    email: "ayse.yilmaz@example.com",
    subject: "Proje Teklifi Talebi",
    message: "Yeni bir iç mimarlık projesi için teklif almak istiyorum. Detayları görüşmek üzere.",
    read: false,
    createdAt: "2024-07-10T10:00:00Z",
  },
  {
    id: "2",
    name: "Mehmet Demir",
    email: "mehmet.demir@example.com",
    subject: "Web Sitesi Hakkında Geri Bildirim",
    message: "Web sitenizdeki galeri bölümü çok etkileyici, tebrikler!",
    read: true,
    createdAt: "2024-07-09T15:30:00Z",
  },
  {
    id: "3",
    name: "Zeynep Kaya",
    email: "zeynep.kaya@example.com",
    subject: "İş Birliği Fırsatları",
    message: "Potansiyel bir iş birliği için sizinle iletişime geçmek istedim.",
    read: false,
    createdAt: "2024-07-08T09:00:00Z",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingReadStatusId, setUpdatingReadStatusId] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      // Simulate API call to fetch messages
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real GitHub-only scenario, messages would be stored in a JSON file
      // and fetched/updated via GitHub API. For this demo, we use in-memory mock.
      setMessages(mockMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast.error("Mesajlar yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu mesajı silmek istediğinizden emin misiniz?")) {
      return
    }
    setDeletingId(id)
    try {
      // Simulate API call to delete message
      await new Promise((resolve) => setTimeout(resolve, 500))
      mockMessages = mockMessages.filter((msg) => msg.id !== id)
      setMessages(mockMessages)
      toast.success("Mesaj başarıyla silindi!")
    } catch (error) {
      console.error("Error deleting message:", error)
      toast.error("Mesaj silinirken hata oluştu.")
    } finally {
      setDeletingId(null)
    }
  }

  const toggleReadStatus = async (id: string) => {
    setUpdatingReadStatusId(id)
    try {
      // Simulate API call to update read status
      await new Promise((resolve) => setTimeout(resolve, 300))
      mockMessages = mockMessages.map((msg) => (msg.id === id ? { ...msg, read: !msg.read } : msg))
      setMessages(mockMessages)
      toast.success("Mesaj durumu güncellendi!")
    } catch (error) {
      console.error("Error updating read status:", error)
      toast.error("Mesaj durumu güncellenirken hata oluştu.")
    } finally {
      setUpdatingReadStatusId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#c4975a]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mesajlar</h1>
          <p className="text-gray-600 mt-2">Gelen mesajları yönetin</p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            <p>Henüz hiç mesajınız yok.</p>
          </div>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className={!message.read ? "border-l-4 border-[#c4975a]" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {message.subject}
                    {!message.read && <span className="ml-2 text-xs font-semibold text-[#c4975a]">YENİ</span>}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReadStatus(message.id)}
                      disabled={updatingReadStatusId === message.id}
                    >
                      {updatingReadStatusId === message.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : message.read ? (
                        <MailOpen className="w-4 h-4" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      <span className="sr-only">
                        {message.read ? "Okunmadı Olarak İşaretle" : "Okundu Olarak İşaretle"}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(message.id)}
                      disabled={deletingId === message.id}
                    >
                      {deletingId === message.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span className="sr-only">Sil</span>
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  Gönderen: {message.name} ({message.email}) - {new Date(message.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{message.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
