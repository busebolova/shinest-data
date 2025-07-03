"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, RefreshCw, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import githubRealtime, { type ConnectionStatus } from "@/lib/github-realtime"

export function RealtimeIndicator() {
  const [status, setStatus] = useState<ConnectionStatus>({ status: "disconnected" })
  const [updateCount, setUpdateCount] = useState(0)
  const [isForceSync, setIsForceSync] = useState(false)

  useEffect(() => {
    // Subscribe to status changes
    const unsubscribeStatus = githubRealtime.onStatusChange(setStatus)

    // Subscribe to messages to count updates
    const unsubscribeMessages = githubRealtime.onMessage((data) => {
      if (data.type !== "heartbeat") {
        setUpdateCount((prev) => prev + 1)
      }
    })

    // Connect to GitHub realtime
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
        return <Wifi className="w-4 h-4 text-green-500" />
      case "polling":
        return <Clock className="w-4 h-4 text-yellow-500" />
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
        return "bg-green-50 border-green-200"
      case "polling":
        return "bg-yellow-50 border-yellow-200"
      case "connecting":
        return "bg-blue-50 border-blue-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusText = () => {
    switch (status.status) {
      case "connected":
        return "Gerçek Zamanlı Bağlı"
      case "polling":
        return "Polling Modu"
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
          <p className="text-sm font-medium text-gray-900">GitHub Durumu: {getStatusText()}</p>
          {status.message && <p className="text-xs text-gray-600">{status.message}</p>}
          {status.attempts && (
            <p className="text-xs text-gray-500">
              Deneme: {status.attempts}/{3}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {updateCount > 0 && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{updateCount} güncelleme</span>
        )}
        {status.lastUpdate && (
          <span className="text-xs text-gray-500">Son: {status.lastUpdate.toLocaleTimeString()}</span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleForceSync}
          disabled={isForceSync}
          className="text-xs bg-transparent"
        >
          {isForceSync ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          <span className="ml-1">Yenile</span>
        </Button>
      </div>
    </div>
  )
}

export default RealtimeIndicator
