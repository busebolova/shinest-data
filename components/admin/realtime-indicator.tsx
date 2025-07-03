"use client"

import { useState, useEffect } from "react"
import { WifiOff, RefreshCw, AlertCircle, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import githubRealtime, { type ConnectionStatus } from "@/lib/github-realtime"

export function RealtimeIndicator() {
  const [status, setStatus] = useState<ConnectionStatus>({ status: "disconnected" })
  const [updateCount, setUpdateCount] = useState(0)
  const [isForceSync, setIsForceSync] = useState(false)
  const [lastActivity, setLastActivity] = useState<Date | null>(null)
  const [connectionInfo, setConnectionInfo] = useState<any>(null)

  useEffect(() => {
    const unsubscribeStatus = githubRealtime.onStatusChange(setStatus)

    const unsubscribeMessages = githubRealtime.onMessage((data) => {
      if (data.type === "heartbeat") {
        setLastActivity(new Date())
        setConnectionInfo(data.data)
      } else {
        setUpdateCount((prev) => prev + 1)
        setLastActivity(new Date())
      }
    })

    // Get initial status
    setStatus(githubRealtime.getStatus())

    return () => {
      unsubscribeStatus()
      unsubscribeMessages()
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
        return <Zap className="w-4 h-4 text-blue-500" />
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
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getStatusText = () => {
    switch (status.status) {
      case "connected":
        return "Real-time Active"
      case "polling":
        return "Live Updates"
      case "connecting":
        return "Connecting..."
      case "error":
        return "Connection Error"
      default:
        return "Disconnected"
    }
  }

  return (
    <Card className={`${getStatusColor()} border`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{getStatusText()}</p>
                {status.status === "connected" && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-2 py-0.5">
                    LIVE
                  </Badge>
                )}
                {status.status === "polling" && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5">
                    POLLING
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs opacity-75">
                {status.message && <span>{status.message}</span>}
                {status.attempts && <span>Attempts: {status.attempts}/3</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {updateCount > 0 && (
              <Badge variant="outline" className="text-xs">
                {updateCount} updates
              </Badge>
            )}

            <div className="text-right text-xs opacity-75">
              {lastActivity && <div>Last: {lastActivity.toLocaleTimeString("tr-TR")}</div>}
              {status.lastUpdate && <div>Sync: {status.lastUpdate.toLocaleTimeString("tr-TR")}</div>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleForceSync}
              disabled={isForceSync}
              className="text-xs h-8 px-3 bg-transparent"
            >
              {isForceSync ? (
                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
              ) : (
                <RefreshCw className="w-3 h-3 mr-1" />
              )}
              Sync
            </Button>
          </div>
        </div>

        {/* Connection Details */}
        {connectionInfo && (
          <div className="mt-3 pt-3 border-t border-current/20">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="opacity-75">Repository:</span>
                <div className="font-mono">{connectionInfo.repository?.name || "N/A"}</div>
              </div>
              <div>
                <span className="opacity-75">Last Commit:</span>
                <div className="font-mono">{connectionInfo.lastCommit?.sha || "N/A"}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RealtimeIndicator
