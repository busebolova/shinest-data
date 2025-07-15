import type React from "react"
import type { Metadata } from "next"
import { Poppins, Cormorant_Garamond, Allura } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { QuoteFormProvider } from "@/contexts/quote-form-context"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
})

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SHINEST - Luxury Interior Architecture",
  description: "Premium interior architecture and design services worldwide",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${poppins.variable} ${cormorant.variable} ${allura.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <QuoteFormProvider>{children}</QuoteFormProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
