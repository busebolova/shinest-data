"use client"

import { motion } from "framer-motion"
import { Wifi, WifiOff, RefreshCw, AlertCircle } from "lucide-react"
import { useRealtimeContent } from "@/hooks/use-realtime-content"

export function RealtimeIndicator() {
  const { connection, sync } = useRealtimeContent()

  const handleSync = async () => {
    await sync()
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        {connection.isConnected ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2 text-green-600"
          >
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">Connected</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2 text-red-600"
          >
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Disconnected</span>
          </motion.div>
        )}
      </div>

      {/* Last Sync */}
      {connection.lastSync && (
        <div className="text-xs text-gray-500">Last sync: {new Date(connection.lastSync).toLocaleTimeString()}</div>
      )}

      {/* Error */}
      {connection.error && (
        <div className="flex items-center space-x-1 text-amber-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs">{connection.error}</span>
        </div>
      )}

      {/* Sync Button */}
      <button
        onClick={handleSync}
        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Sync</span>
      </button>
    </div>
  )
}
