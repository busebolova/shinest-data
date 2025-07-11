"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { githubRealtime } from "@/lib/github-realtime"

interface ConnectionStatus {
  isConnected: boolean
  lastUpdate: Date
  retryCount: number
}

export function RealtimeStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    lastUpdate: new Date(),
    retryCount: 0,
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // İlk durumu al
    setStatus(githubRealtime.getConnectionStatus())

    // Gerçek zamanlı verileri dinle
    const unsubscribe = githubRealtime.subscribe((data) => {
      setStatus(githubRealtime.getConnectionStatus())
    })

    // Durum güncellemelerini dinle
    const statusInterval = setInterval(() => {
      setStatus(githubRealtime.getConnectionStatus())
    }, 5000)

    return () => {
      unsubscribe()
      clearInterval(statusInterval)
    }
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      githubRealtime.forceSync()
      // 2 saniye bekle ve durumu güncelle
      setTimeout(() => {
        setStatus(githubRealtime.getConnectionStatus())
        setIsRefreshing(false)
      }, 2000)
    } catch (error) {
      console.error("Refresh error:", error)
      setIsRefreshing(false)
    }
  }

  const formatLastUpdate = (date: Date) => {
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
    <div className="flex items-center gap-3">
      {status.isConnected ? (
        <>
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-green-500" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-green-700">Gerçek Zamanlı</div>
            <div className="text-xs text-gray-500">Son güncelleme: {formatLastUpdate(status.lastUpdate)}</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 text-red-500" />
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-red-700">Bağlantı Yok</div>
            {status.retryCount > 0 && (
              <div className="text-xs text-gray-500">Yeniden deneme: {status.retryCount}/3</div>
            )}
          </div>
        </>
      )}

      <Button
        onClick={handleRefresh}
        disabled={isRefreshing}
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white bg-transparent"
      >
        <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
      </Button>
    </div>
  )
}
