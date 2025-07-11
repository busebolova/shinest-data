"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface QuoteFormContextType {
  isOpen: boolean
  openQuoteForm: () => void
  closeQuoteForm: () => void
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined)

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openQuoteForm = () => {
    console.log("Opening quote form...")
    setIsOpen(true)
  }

  const closeQuoteForm = () => {
    console.log("Closing quote form...")
    setIsOpen(false)
  }

  return (
    <QuoteFormContext.Provider value={{ isOpen, openQuoteForm, closeQuoteForm }}>{children}</QuoteFormContext.Provider>
  )
}

export function useQuoteForm() {
  const context = useContext(QuoteFormContext)
  if (context === undefined) {
    throw new Error("useQuoteForm must be used within a QuoteFormProvider")
  }
  return context
}
