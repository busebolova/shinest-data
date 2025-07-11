"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { RefreshCw, Github, Wifi, WifiOff, Settings } from "lucide-react"
import Link from "next/link"

interface AdminHeaderProps {
  title: string
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [lastSync, setLastSync] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [githubConnected, setGithubConnected] = useState(false)

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check GitHub connection
    checkGitHubConnection()

    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      if (isOnline) {
        handleRefresh()
      }
    }, 30000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [isOnline])

  const checkGitHubConnection = async () => {
    try {
      const response = await fetch("/api/github/repository")
      setGithubConnected(response.ok)
    } catch (error) {
      setGithubConnected(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Refresh dashboard data
      await fetch("/api/admin/dashboard", { cache: "no-store" })
      setLastSync(new Date())
    } catch (error) {
      console.error("Refresh failed:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <TooltipProvider>
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">SHINEST Admin Panel</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    {isOnline ? (
                      <Wifi className="h-4 w-4 text-green-500" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-red-500" />
                    )}
                    <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "Online" : "Offline"}</Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bağlantı durumu: {isOnline ? "Çevrimiçi" : "Çevrimdışı"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    <Badge variant={githubConnected ? "default" : "secondary"}>
                      {githubConnected ? "Connected" : "Local"}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{githubConnected ? "GitHub repository bağlı" : "Yerel depolama kullanılıyor"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Last Sync */}
            <div className="text-xs text-gray-500">Son güncelleme: {lastSync.toLocaleTimeString("tr-TR")}</div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verileri yenile</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/settings">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ayarlar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
