"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Folder, FileText, PencilRuler, ImageIcon, Mail, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/projects", icon: Folder, label: "Projeler" },
    { href: "/admin/blog", icon: FileText, label: "Blog" },
    { href: "/admin/content", icon: PencilRuler, label: "İçerik" },
    { href: "/admin/media", icon: ImageIcon, label: "Medya" },
    { href: "/admin/messages", icon: Mail, label: "Mesajlar" },
    { href: "/admin/settings", icon: Settings, label: "Ayarlar" },
  ]

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <Image src="/images/shinest-logo-main.png" alt="SHINEST Logo" width={32} height={32} className="h-8 w-8" />
          <span className="">SHINEST Admin</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname.startsWith(item.href) && "bg-muted text-primary",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
