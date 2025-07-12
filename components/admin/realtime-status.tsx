"use client"

import { useEffect, useState } from "react"
import { githubRealtime, type ConnectionStatus } from "@/lib/github-realtime"
import { Wifi, WifiOff, AlertTriangle, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export function RealtimeStatus() {
  const [status, setStatus] = useState<ConnectionStatus>(githubRealtime.getConnectionStatus())
  const [lastUpdate, setLastUpdate] = useState<string>(githubRealtime.getData().lastUpdate)

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe((data) => {
      setStatus(data.connectionStatus)
      setLastUpdate(data.lastUpdate)
    })

    return () => unsubscribe()
  }, [])

  const renderIcon = () => {
    switch (status) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "connecting":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />
    }
  }

  const renderTooltipContent = () => {
    const lastUpdateDate = new Date(lastUpdate).toLocaleString()
    switch (status) {
      case "connected":
        return `Çevrimiçi. Son senkronizasyon: ${lastUpdateDate}`
      case "disconnected":
        return `Çevrimdışı. Son senkronizasyon: ${lastUpdateDate}`
      case "connecting":
        return "Bağlanıyor..."
      case "error":
        return `Hata oluştu. Son senkronizasyon: ${lastUpdateDate}`
      default:
        return "Durum bilinmiyor."
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            {renderIcon()}
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {status === "connected" ? "Canlı" : status === "disconnected" ? "Çevrimdışı" : "Bağlanıyor"}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">{renderTooltipContent()}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
