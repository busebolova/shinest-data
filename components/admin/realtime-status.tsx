"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Wifi, WifiOff, Loader2, Github } from "lucide-react"
import { githubRealtime, type ConnectionStatus } from "@/lib/github-realtime"
import { toast } from "sonner"

export function RealtimeStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({ status: "disconnected" })
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    const unsubscribe = githubRealtime.onStatusChange(setStatus)

    // Get initial status
    setStatus(githubRealtime.getStatus())

    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = githubRealtime.onMessage((data) => {
      if (data.type === "heartbeat") {
        console.log("GitHub heartbeat:", data.data)
      }
    })

    return unsubscribe
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    try {
      await githubRealtime.forceSync()
      toast.success("Senkronizasyon tamamlandı!")
    } catch (error) {
      toast.error("Senkronizasyon başarısız: " + (error as Error).message)
    } finally {
      setSyncing(false)
    }
  }

  const getStatusBadge = () => {
    switch (status.status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
            <Wifi className="w-3 h-3 mr-1" />
            Bağlı
          </Badge>
        )
      case "connecting":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Bağlanıyor...
          </Badge>
        )
      case "polling":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Yerel Mod
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
            <WifiOff className="w-3 h-3 mr-1" />
            Hata
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
            <WifiOff className="w-3 h-3 mr-1" />
            Bağlantısız
          </Badge>
        )
    }
  }

  return (
    <div className="flex items-center gap-2">
      {getStatusBadge()}

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Github className="w-3 h-3" />
        <span>Gerçek Zamanlı</span>
      </div>

      <Button onClick={handleSync} disabled={syncing} variant="ghost" size="sm" className="h-6 px-2 text-xs">
        {syncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
      </Button>

      {status.message && (
        <span className="text-xs text-gray-500 max-w-48 truncate" title={status.message}>
          {status.message}
        </span>
      )}

      {status.lastUpdate && (
        <span className="text-xs text-gray-400">{status.lastUpdate.toLocaleTimeString("tr-TR")}</span>
      )}
    </div>
  )
}
