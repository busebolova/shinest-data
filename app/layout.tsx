import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { QuoteFormProvider } from "@/contexts/quote-form-context"
import { QuoteFormModal } from "@/components/quote-form-modal"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <title>SHINEST - İç Mimarlık & Tasarım</title>
        <meta
          name="description"
          content="Hayalinizdeki yaşam alanlarını gerçeğe dönüştürüyoruz. Modern tasarım anlayışı ile estetik ve fonksiyonelliği bir araya getiriyoruz."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <QuoteFormProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <QuoteFormModal />
          </QuoteFormProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
