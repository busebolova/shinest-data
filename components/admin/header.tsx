"use client"

import { Bell, Search, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="font-display text-2xl text-shinest-blue">Admin Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:ring-shinest-blue focus:border-shinest-blue"
          />
        </div>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-shinest-blue">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-shinest-blue">
          <UserCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
