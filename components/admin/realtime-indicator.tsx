"use client"

import { useState, useEffect } from "react"
import { WifiOff, RefreshCw, Clock, AlertCircle, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import githubRealtime, { type ConnectionStatus } from "@/lib/github-realtime"

export function RealtimeIndicator() {
  const [status, setStatus] = useState<ConnectionStatus>({ status: "disconnected" })
  const [updateCount, setUpdateCount] = useState(0)
  const [isForceSync, setIsForceSync] = useState(false)
  const [lastActivity, setLastActivity] = useState<Date | null>(null)

  useEffect(() => {
    const unsubscribeStatus = githubRealtime.onStatusChange(setStatus)

    const unsubscribeMessages = githubRealtime.onMessage((data) => {
      if (data.type !== "heartbeat") {
        setUpdateCount((prev) => prev + 1)
        setLastActivity(new Date())
      }
    })

    githubRealtime.connect()

    return () => {
      unsubscribeStatus()
      unsubscribeMessages()
      githubRealtime.disconnect()
    }
  }, [])

  const handleForceSync = async () => {
    setIsForceSync(true)
    try {
      await githubRealtime.forceSync()
    } catch (error) {
      console.error("Force sync failed:", error)
    } finally {
      setIsForceSync(false)
    }
  }

  const getStatusIcon = () => {
    switch (status.status) {
      case "connected":
        return <Activity className="w-4 h-4 text-green-500 animate-pulse" />
      case "polling":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "connecting":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (status.status) {
      case "connected":
        return "bg-green-50 border-green-200 text-green-800"
      case "polling":
        return "bg-blue-50 border-blue-200 text-blue-800"
      case "connecting":
        return "bg-blue-50 border-blue-200 text-blue-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getStatusText = () => {
    switch (status.status) {
      case "connected":
        return "Gerçek Zamanlı Aktif"
      case "polling":
        return "Gerçek Zamanlı Polling"
      case "connecting":
        return "Bağlanıyor..."
      case "error":
        return "Bağlantı Hatası"
      default:
        return "Bağlantı Yok"
    }
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">GitHub: {getStatusText()}</p>
            {status.status === "connected" && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                LIVE
              </Badge>
            )}
          </div>
          {status.message && <p className="text-xs opacity-75">{status.message}</p>}
          {status.attempts && <p className="text-xs opacity-60">Deneme: {status.attempts}/3</p>}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {updateCount > 0 && (
          <Badge variant="outline" className="text-xs">
            {updateCount} güncelleme
          </Badge>
        )}
        {lastActivity && <span className="text-xs opacity-60">Son: {lastActivity.toLocaleTimeString("tr-TR")}</span>}
        {status.lastUpdate && (
          <span className="text-xs opacity-60">Sync: {status.lastUpdate.toLocaleTimeString("tr-TR")}</span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleForceSync}
          disabled={isForceSync}
          className="text-xs h-7 px-2 bg-transparent"
        >
          {isForceSync ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          <span className="ml-1">Sync</span>
        </Button>
      </div>
    </div>
  )
}

export default RealtimeIndicator
