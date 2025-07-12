"use client"

import { useEffect, useState } from "react"
import { githubRealtime, type ConnectionStatus, type RealtimeMessage } from "@/lib/github-realtime"
import { WifiOff, RefreshCw, AlertCircle, Github, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RealtimeStatus() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isGitHubConfigured, setIsGitHubConfigured] = useState(false)
  const [lastMessage, setLastMessage] = useState<RealtimeMessage | null>(null)

  useEffect(() => {
    // Check GitHub configuration
    setIsGitHubConfigured(githubRealtime.isGitHubConfigured())

    // Subscribe to data updates
    const unsubscribeData = githubRealtime.subscribe((data) => {
      setStatus(data.connectionStatus)
      setLastUpdate(data.lastUpdate)
    })

    // Subscribe to messages
    const unsubscribeMessages = githubRealtime.onMessage((message) => {
      setLastMessage(message)
    })

    return () => {
      unsubscribeData()
      unsubscribeMessages()
    }
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await githubRealtime.refresh()
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "connected":
        return isGitHubConfigured ? (
          <Github className="h-4 w-4 text-green-500" />
        ) : (
          <Database className="h-4 w-4 text-blue-500" />
        )
      case "connecting":
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return isGitHubConfigured ? "GitHub Bağlı" : "Yerel Veri"
      case "connecting":
        return "Bağlanıyor..."
      case "error":
        return "Bağlantı Hatası"
      default:
        return "Bağlantı Yok"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return isGitHubConfigured ? "text-green-600" : "text-blue-600"
      case "connecting":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getBadgeVariant = () => {
    switch (status) {
      case "connected":
        return "secondary"
      case "connecting":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getBadgeText = () => {
    switch (status) {
      case "connected":
        return isGitHubConfigured ? "GitHub" : "Yerel"
      case "connecting":
        return "Senkronize"
      case "error":
        return "Hata"
      default:
        return "Çevrimdışı"
    }
  }

  const formatLastUpdate = (dateString: string) => {
    if (!dateString) return "Henüz yok"

    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))

    if (minutes < 1) return "Az önce"
    if (minutes < 60) return `${minutes} dakika önce`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} saat önce`
    return date.toLocaleDateString("tr-TR")
  }

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</span>
          <Badge variant={getBadgeVariant()} className="text-xs">
            {getBadgeText()}
          </Badge>
        </div>

        {lastUpdate && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-gray-500 cursor-help">{formatLastUpdate(lastUpdate)}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Son güncelleme: {new Date(lastUpdate).toLocaleString("tr-TR")}</p>
              {lastMessage && <p className="text-xs mt-1">Kaynak: {lastMessage.data?.source || "bilinmiyor"}</p>}
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 px-2 bg-transparent border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Verileri yenile</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
