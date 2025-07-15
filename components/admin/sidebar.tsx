"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Settings, Package, BarChart, FileText } from "lucide-react" // FileText iconunu ekledik
import Image from "next/image"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Content", href: "/admin/content", icon: FileText }, // Yeni içerik yönetimi linki
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-shinest-blue text-white flex flex-col p-4 shadow-lg">
      <div className="flex items-center justify-center mb-8 mt-4">
        <Link href="/admin">
          <div className="w-24 h-24 relative cursor-pointer">
            <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain invert" priority />
          </div>
        </Link>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                ? "bg-shinest-gold text-shinest-blue font-semibold"
                : "hover:bg-shinest-blue/80 text-white/90"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-sans text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-white/20 text-center">
        <p className="font-sans text-xs text-white/70">© 2025 Shinest Admin</p>
      </div>
    </aside>
  )
}
