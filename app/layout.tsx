import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
// Düzeltme: 'import Header from ...' -> 'import { Header } from ...'
import { Header } from "@/components/header"
// Düzeltme: 'import Footer from ...' -> 'import { Footer } from ...'
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { QuoteFormProvider } from "@/contexts/quote-form-context"
import QuoteFormModal from "@/components/quote-form-modal"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "SHINEST Interior Architecture",
  description:
    "We transform your living spaces into works of art. We create functional and aesthetic spaces with a modern design approach.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={poppins.className}>
        <LanguageProvider>
          <QuoteFormProvider>
            <Header />
            <main className="pt-20 bg-white">{children}</main>
            <Footer />
            <QuoteFormModal />
            <Toaster />
          </QuoteFormProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
