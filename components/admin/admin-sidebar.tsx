"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/classname"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RealtimeStatus } from "@/components/admin/realtime-status"
import { LayoutDashboard, FileText, X, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  className?: string
}

export function AdminSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    content: pathname?.startsWith("/admin/content") || false,
    projects: pathname?.startsWith("/admin/projects") || false,
  })

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") {
      return true
    }
    return path !== "/admin" && pathname?.startsWith(path)
  }

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center">
          <Image src="/images/shinest-logo.png" alt="SHINEST" width={120} height={40} className="h-8 w-auto" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Separator className="my-2" />

      <div className="px-4 py-2">
        <RealtimeStatus />
      </div>

      <Separator className="my-2" />

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          <Link href="/admin">
            <Button
              variant={isActive("/admin") ? "secondary" : "ghost"}
              size="sm"
              className={cn("w-full justify-start", isActive("/admin") && "bg-[#c4975a]/10 text-[#c4975a]")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          {/* Content Management */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between"
              onClick={() => toggleSubmenu("content")}
            >
              <span className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                İçerik Yönetimi
              </span>
              {openSubmenus.content ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {openSubmenus.content && (
              <div className="ml-4 mt-1 space-y-1">
                <Link href="/admin/content">
                  <Button
                    variant={isActive("/admin/content") && !pathname?.includes("/admin/content/") ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start",
                      isActive("/admin/content") && !pathname?.includes("/admin/content/") && "bg-[#c4975a]/10 text-[#c4975a]"
                    )}
                  >
                    <FileText className="mr-2 h-3 w-3" />\
