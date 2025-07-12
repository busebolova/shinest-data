import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { QuoteFormProvider } from "@/contexts/quote-form-context"
import { Toaster } from "@/components/ui/toaster" // Toaster'ı ekledik

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SHINEST İç Mimarlık",
  description: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <QuoteFormProvider>{children}</QuoteFormProvider>
        </LanguageProvider>
        <Toaster /> {/* Toaster'ı body'nin sonuna ekledik */}
      </body>
    </html>
  )
}
