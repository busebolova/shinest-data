"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Settings, FileText, ImageIcon, MessageSquare, Edit } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "İçerik Yönetimi", href: "/admin/content", icon: Edit },
  { name: "Projeler", href: "/admin/projects", icon: ImageIcon },
  { name: "Blog", href: "/admin/blog", icon: MessageSquare },
  { name: "Medya", href: "/admin/media", icon: FileText },
  { name: "Ayarlar", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm border-r">
        <div className="flex h-16 shrink-0 items-center">
          <img className="h-8 w-auto" src="/images/logo1.png" alt="SHINEST" />
          <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600",
                          "h-5 w-5 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
