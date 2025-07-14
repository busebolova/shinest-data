"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface QuoteFormContextType {
  isOpen: boolean
  openQuoteForm: () => void
  closeQuoteForm: () => void
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined)

export function QuoteFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openQuoteForm = () => setIsOpen(true)
  const closeQuoteForm = () => setIsOpen(false)

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
