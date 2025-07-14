"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw, Activity, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"

interface RealtimeStatus {
  connected: boolean
  lastUpdate: Date | null
  updateCount: number
  error: string | null
  commitInfo: any
}

export function RealtimeIndicator() {
  const [status, setStatus] = useState<RealtimeStatus>({
    connected: false,
    lastUpdate: null,
    updateCount: 0,
    error: null,
    commitInfo: null,
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Simulate connection status
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        connected: true,
        lastUpdate: new Date(),
        updateCount: prev.updateCount + 1,
        commitInfo: {
          sha: "a1b2c3d",
          author: "Admin",
          message: "Site içeriği güncellendi",
        },
      }))
    }, 8000)

    // Initial connection
    setStatus((prev) => ({
      ...prev,
      connected: true,
      lastUpdate: new Date(),
    }))

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulate refresh
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus((prev) => ({
        ...prev,
        lastUpdate: new Date(),
        updateCount: prev.updateCount + 1,
      }))
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        error: "Yenileme başarısız",
      }))
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {status.connected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <Badge
              variant={status.connected ? "default" : "destructive"}
              className={cn(
                "flex items-center gap-1",
                status.connected
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-red-100 text-red-700 border-red-200",
              )}
            >
              <span className="text-xs font-medium">{status.connected ? "Canlı Bağlantı" : "Bağlantı Yok"}</span>
            </Badge>
          </div>

          {/* Update Info */}
          {status.lastUpdate && (
            <div className="text-sm text-gray-600">Son güncelleme: {status.lastUpdate.toLocaleTimeString("tr-TR")}</div>
          )}

          {/* Update Counter */}
          {status.updateCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
              <Activity className="w-3 h-3 mr-1" />
              <span className="text-xs">{status.updateCount} güncelleme</span>
            </Badge>
          )}

          {/* Commit Info */}
          {status.commitInfo && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <GitBranch className="w-3 h-3" />
              <span>{status.commitInfo.sha}</span>
              <span>•</span>
              <span>{status.commitInfo.author}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 px-3 bg-transparent"
          >
            <RefreshCw className={cn("w-3 h-3 mr-1", isRefreshing && "animate-spin")} />
            <span className="text-xs">{isRefreshing ? "Yenileniyor..." : "Senkronize Et"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
