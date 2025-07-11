"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Wifi, WifiOff, RefreshCw, Clock } from "lucide-react"
import { githubRealtime } from "@/lib/github-realtime"

export function RealtimeStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const unsubscribe = githubRealtime.subscribe((data) => {
      setIsConnected(data.isConnected)
      setLastUpdate(new Date(data.lastUpdate))
      setIsRefreshing(false)
    })

    return unsubscribe
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await githubRealtime.refresh()
    } catch (error) {
      console.error("Refresh failed:", error)
    }
    // isRefreshing will be set to false in the subscription callback
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleRefresh}>
              {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
              <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
                {isConnected ? "Bağlı" : "Çevrimdışı"}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p>Sistem durumu: {isConnected ? "Çevrimiçi" : "Çevrimdışı"}</p>
              <p className="text-xs text-gray-500">Yenilemek için tıklayın</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {isRefreshing ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Clock className="h-3 w-3" />}
              <span>{formatTime(lastUpdate)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Son güncelleme: {lastUpdate.toLocaleString("tr-TR")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
