import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SHINEST - İç Mimarlık",
  description: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
