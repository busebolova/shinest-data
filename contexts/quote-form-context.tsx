"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface QuoteFormData {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  location: string
  message: string
}

interface QuoteFormContextType {
  isOpen: boolean
  formData: QuoteFormData
  openQuoteForm: () => void
  closeQuoteForm: () => void
  updateFormData: (data: Partial<QuoteFormData>) => void
  submitForm: () => Promise<void>
  isSubmitting: boolean
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined)

const initialFormData: QuoteFormData = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  location: "",
  message: "",
}

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openQuoteForm = () => setIsOpen(true)
  const closeQuoteForm = () => {
    setIsOpen(false)
    setFormData(initialFormData)
  }

  const updateFormData = (data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const submitForm = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)

      // Reset form and close modal
      setFormData(initialFormData)
      setIsOpen(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <QuoteFormContext.Provider
      value={{
        isOpen,
        formData,
        openQuoteForm,
        closeQuoteForm,
        updateFormData,
        submitForm,
        isSubmitting,
      }}
    >
      {children}
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
