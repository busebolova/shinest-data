"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, LogOut, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface AdminHeaderProps {
  user?: {
    name: string
    email: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState("tr")
  const router = useRouter()

  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    router.push("/admin/login")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">SHINEST Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Badge variant="outline" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {user?.name || "Admin"}
            </Badge>

            <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
              <Eye className="w-4 h-4 mr-2" />
              Siteyi Görüntüle
            </Button>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
