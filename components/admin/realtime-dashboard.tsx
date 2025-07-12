"use client"

import { cn } from "@/lib/utils"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, FileText, LayoutDashboard, Wifi, WifiOff, AlertTriangle } from "lucide-react"
import { githubRealtime, type ConnectionStatus, type RealtimeData, type RealtimeMessage } from "@/lib/github-realtime"
import { formatDistanceToNow, parseISO } from "date-fns"
import { tr } from "date-fns/locale"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function RealtimeDashboard() {
  const [data, setData] = useState<RealtimeData>(githubRealtime.getData())
  const [messages, setMessages] = useState<RealtimeMessage[]>([])
  const [loading, setLoading] = useState(false)

  const handleDataUpdate = useCallback((updatedData: RealtimeData) => {
    setData(updatedData)
    setLoading(false)
  }, [])

  const handleMessage = useCallback((message: RealtimeMessage) => {
    setMessages((prev) => [message, ...prev].slice(0, 10)) // Keep last 10 messages
    if (message.type === "error") {
      toast.error(`Gerçek Zamanlı Hata: ${message.data?.error || "Bilinmeyen hata"}`)
    } else if (message.type === "connected") {
      toast.success("Gerçek Zamanlı Bağlantı Kuruldu!")
    } else if (message.type === "disconnected") {
      toast.warning("Gerçek Zamanlı Bağlantı Kesildi.")
    }
  }, [])

  useEffect(() => {
    const unsubscribeData = githubRealtime.subscribe(handleDataUpdate)
    const unsubscribeMessages = githubRealtime.onMessage(handleMessage)

    // Initial fetch if data is empty
    if (data.projects.length === 0 && data.blogs.length === 0) {
      setLoading(true)
      githubRealtime.refresh().finally(() => setLoading(false))
    }

    return () => {
      unsubscribeData()
      unsubscribeMessages()
    }
  }, [handleDataUpdate, handleMessage, data.projects.length, data.blogs.length])

  const handleRefresh = async () => {
    setLoading(true)
    await githubRealtime.refresh()
  }

  const renderConnectionStatus = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-500 hover:bg-green-500 text-white">
            <Wifi className="w-3 h-3 mr-1" /> Çevrimiçi
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="destructive">
            <WifiOff className="w-3 h-3 mr-1" /> Çevrimdışı
          </Badge>
        )
      case "connecting":
        return (
          <Badge variant="secondary">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Bağlanıyor...
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" /> Hata
          </Badge>
        )
      default:
        return null
    }
  }

  const formatTimeAgo = (isoString: string) => {
    if (!isoString) return "N/A"
    try {
      return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: tr })
    } catch (e) {
      return "Geçersiz Tarih"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Real-time Status Card */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gerçek Zamanlı Durum</CardTitle>
          {renderConnectionStatus(data.connectionStatus)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.connectionStatus === "connected" ? "Aktif" : "Pasif"}</div>
          <p className="text-xs text-muted-foreground mt-1">Son Güncelleme: {formatTimeAgo(data.lastUpdate)}</p>
          <Button onClick={handleRefresh} disabled={loading} className="mt-4 w-full">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            {loading ? "Yenileniyor..." : "Şimdi Yenile"}
          </Button>
          {!githubRealtime.isGitHubConfigured() && (
            <p className="text-sm text-orange-500 mt-2">
              GitHub API yapılandırılmadı. Veriler yerel depolamadan çekiliyor.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Projeler</CardTitle>
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.projects.length}</div>
          <p className="text-xs text-muted-foreground">{data.dashboard.projectsPublished || 0} yayınlanmış</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Blog Yazıları</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.blogs.length}</div>
          <p className="text-xs text-muted-foreground">{data.dashboard.blogPostsPublished || 0} yayınlanmış</p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Son Etkinlikler (Gerçek Zamanlı Mesajlar)</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {messages.length === 0 && <p className="text-muted-foreground text-sm">Henüz bir etkinlik yok.</p>}
              {messages.map((msg, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <span className="text-muted-foreground">[{new Date(msg.timestamp).toLocaleTimeString()}]</span>
                  {msg.type === "connected" && (
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      Bağlandı
                    </Badge>
                  )}
                  {msg.type === "disconnected" && (
                    <Badge variant="outline" className="bg-red-100 text-red-700">
                      Bağlantı Kesildi
                    </Badge>
                  )}
                  {msg.type === "connecting" && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      Bağlanıyor
                    </Badge>
                  )}
                  {msg.type === "error" && <Badge variant="destructive">Hata</Badge>}
                  {msg.type === "sync" && <Badge variant="secondary">Senkronizasyon</Badge>}
                  <span className="flex-1 text-gray-700">
                    {msg.data?.source && `(${msg.data.source}) `}
                    {msg.data?.message || msg.data?.error || msg.type}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function Loader2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
