"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  ImageIcon,
  MessageSquare,
  PenSquare,
  Settings,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/projects",
    icon: FolderKanban,
    label: "Projeler",
  },
  {
    label: "İçerik",
    icon: PenSquare,
    subItems: [
      { href: "/admin/content/home", label: "Ana Sayfa" },
      { href: "/admin/content/about", label: "Hakkımızda" },
      { href: "/admin/content/services", label: "Hizmetler" },
      { href: "/admin/content/global", label: "Global" },
    ],
  },
  {
    href: "/admin/blog",
    icon: Newspaper,
    label: "Blog",
  },
  {
    href: "/admin/media",
    icon: ImageIcon,
    label: "Medya",
  },
  {
    href: "/admin/messages",
    icon: MessageSquare,
    label: "Mesajlar",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Ayarlar",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const isParentActive = (subItems: any[] | undefined) => {
    if (!subItems) return false
    return subItems.some((item) => pathname.startsWith(item.href))
  }

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">
      <SidebarHeader>
        <Link href="/admin/dashboard" className="flex h-full items-center justify-center">
          <Image
            src="/images/shinest-logo-main.png"
            width={40}
            height={40}
            alt="Shinest Logo"
            className="transition-all group-data-[state=collapsed]:hidden"
          />
          <Image
            src="/images/shinest-logo-main.png"
            width={32}
            height={32}
            alt="Shinest Logo"
            className="hidden transition-all group-data-[state=collapsed]:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) =>
            item.subItems ? (
              <Collapsible key={item.label} defaultOpen={isParentActive(item.subItems)} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger className="w-full">
                    <SidebarMenuButton tooltip={item.label} isActive={isParentActive(item.subItems)} className="w-full">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.href}>
                          <SidebarMenuSubButton asChild isActive={isActive(subItem.href)}>
                            <Link href={subItem.href}>{subItem.label}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.label} isActive={isActive(item.href!)}>
                  <Link href={item.href!}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
