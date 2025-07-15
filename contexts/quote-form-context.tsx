"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import QuoteFormModal from "@/components/quote-form-modal"

interface QuoteFormContextType {
  openQuoteForm: () => void
  closeQuoteForm: () => void
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined)

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  const openQuoteForm = () => setIsQuoteFormOpen(true)
  const closeQuoteForm = () => setIsQuoteFormOpen(false)

  return (
    <QuoteFormContext.Provider value={{ openQuoteForm, closeQuoteForm }}>
      {children}
      <QuoteFormModal isOpen={isQuoteFormOpen} onClose={closeQuoteForm} />
    </QuoteFormContext.Provider>
  )
}

export function useQuoteForm() {
  const context = useContext(QuoteFormContext)
  if (context === undefined) {
    throw new Error("useQuoteForm must be used within a QuoteFormProvider")
  }
  return context
}
