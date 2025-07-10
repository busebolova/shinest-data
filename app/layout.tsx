import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { QuoteFormProvider } from "@/contexts/quote-form-context"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SHINEST İç Mimarlık",
  description: "Yenilikçi ve fonksiyonel iç mekan çözümleri",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <QuoteFormProvider>
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </QuoteFormProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
