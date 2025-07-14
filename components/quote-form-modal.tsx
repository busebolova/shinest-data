"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useQuoteForm } from "@/contexts/quote-form-context"
import { useLanguage } from "@/contexts/language-context"
import { sendWhatsAppMessage } from "@/utils/whatsapp"

interface FormData {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  message: string
}

export function QuoteFormModal() {
  const { isOpen, closeQuoteForm } = useQuoteForm()
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // WhatsApp mesajı oluştur
      const message = `
🏠 SHINEST İç Mimarlık - Yeni Teklif Talebi

👤 Ad Soyad: ${formData.name}
📧 E-posta: ${formData.email}
📱 Telefon: ${formData.phone}
🏗️ Proje Türü: ${formData.projectType}
💰 Bütçe: ${formData.budget}

📝 Mesaj:
${formData.message}

---
Bu mesaj SHINEST web sitesi teklif formundan gönderilmiştir.
      `.trim()

      // WhatsApp'a gönder
      await sendWhatsAppMessage(message)

      setSubmitStatus("success")

      // 2 saniye sonra formu temizle ve kapat
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          message: "",
        })
        setSubmitStatus("idle")
        closeQuoteForm()
      }, 2000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = [
    { value: "konut", label: "Konut Projesi" },
    { value: "ofis", label: "Ofis Tasarımı" },
    { value: "ticari", label: "Ticari Mekan" },
    { value: "restoran", label: "Restoran/Kafe" },
    { value: "otel", label: "Otel/Konaklama" },
    { value: "diger", label: "Diğer" },
  ]

  const budgetRanges = [
    { value: "50k-100k", label: "50.000 - 100.000 TL" },
    { value: "100k-250k", label: "100.000 - 250.000 TL" },
    { value: "250k-500k", label: "250.000 - 500.000 TL" },
    { value: "500k+", label: "500.000 TL+" },
    { value: "belirtmek-istemiyorum", label: "Belirtmek İstemiyorum" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeQuoteForm}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-display text-2xl font-bold text-shinest-blue">Teklif Talep Formu</h2>
              <button
                onClick={closeQuoteForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-sans text-green-800">
                    Talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="font-sans text-red-800">
                    Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan iletişime geçin.
                  </p>
                </motion.div>
              )}

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinest-blue focus:border-transparent transition-colors duration-200 font-sans"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinest-blue focus:border-transparent transition-colors duration-200 font-sans"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinest-blue focus:border-transparent transition-colors duration-200 font-sans"
                    placeholder="0555 123 45 67"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Proje Türü *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinest-blue focus:border-transparent transition-colors duration-200 font-sans"
                  >
                    <option value="">Proje türünü seçin</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Bütçe Aralığı
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinest-blue focus:border-transparent transition-colors duration-200 font-sans"
                >
                  <option value="">Bütçe aralığını seçin (opsiyonel)</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Proje Detayları *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shinest-blue focus:border-transparent transition-colors duration-200 font-sans resize-none"
                  placeholder="Projeniz hakkında detaylı bilgi verin. Mekan büyüklüğü, istediğiniz stil, özel istekleriniz vb."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeQuoteForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-sans font-medium"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "success"}
                  className="px-6 py-3 bg-shinest-blue text-white rounded-lg hover:bg-shinest-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans font-medium flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Gönderildi</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Teklif Talep Et</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
