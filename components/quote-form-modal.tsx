"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, User, Phone, Mail, MessageSquare } from "lucide-react"

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "İsim Soyisim alanı zorunludur"
    if (!formData.phone.trim()) newErrors.phone = "Telefon alanı zorunludur"
    if (!formData.email.trim()) newErrors.email = "E-posta alanı zorunludur"
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Geçerli bir e-posta adresi giriniz"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Burada form verilerini gönderme işlemi yapılabilir
      // Örneğin bir API endpoint'e veya e-posta servisine

      // Simüle edilmiş bir gecikme
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
      })

      // 5 saniye sonra modal'ı kapat
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Form gönderme hatası:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Kapatma fonksiyonu - event propagation'ı durdur
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  // Backdrop tıklama - sadece backdrop'a tıklanırsa kapat
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-shinest-blue/20 via-black/50 to-[#cfaf76]/20 backdrop-blur-md" />

          <motion.div
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/20"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#cfaf76]/5 via-transparent to-shinest-blue/5 pointer-events-none" />

            {/* Header */}
            <div className="relative p-8 pb-6 border-b border-gray-100/50">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100/50 z-50"
                aria-label="Kapat"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <motion.h2
                  className="font-display text-3xl text-shinest-blue mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Hayallerinizi Paylaşın
                </motion.h2>

                <motion.p
                  className="text-gray-600 font-sans"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Yaşam alanınızı birlikte tasarlayalım
                </motion.p>
              </div>
            </div>

            <div className="relative p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  <h3 className="text-3xl font-display text-shinest-blue mb-4">Mükemmel!</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Talebiniz başarıyla alındı. SHINEST ekibi olarak en kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Bu pencere otomatik olarak kapanacaktır
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Form Fields - Yeni minimal tasarım */}
                  <div className="space-y-8">
                    {/* Full Name */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-4 pb-3">
                        <User
                          className={`w-5 h-5 transition-colors duration-300 ${focusedField === "fullName" ? "text-shinest-blue" : "text-gray-400"}`}
                        />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("fullName")}
                          onBlur={() => setFocusedField(null)}
                          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-sans text-lg"
                          placeholder="Ad Soyad"
                        />
                      </div>
                      <div
                        className={`h-px transition-all duration-300 ${focusedField === "fullName" ? "bg-shinest-blue" : "bg-gray-200"}`}
                      />
                      {errors.fullName && (
                        <motion.p
                          className="mt-2 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.fullName}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center gap-4 pb-3">
                        <Phone
                          className={`w-5 h-5 transition-colors duration-300 ${focusedField === "phone" ? "text-shinest-blue" : "text-gray-400"}`}
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-sans text-lg"
                          placeholder="Telefon"
                        />
                      </div>
                      <div
                        className={`h-px transition-all duration-300 ${focusedField === "phone" ? "bg-shinest-blue" : "bg-gray-200"}`}
                      />
                      {errors.phone && (
                        <motion.p
                          className="mt-2 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-4 pb-3">
                        <Mail
                          className={`w-5 h-5 transition-colors duration-300 ${focusedField === "email" ? "text-shinest-blue" : "text-gray-400"}`}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-sans text-lg"
                          placeholder="E-posta"
                        />
                      </div>
                      <div
                        className={`h-px transition-all duration-300 ${focusedField === "email" ? "bg-shinest-blue" : "bg-gray-200"}`}
                      />
                      {errors.email && (
                        <motion.p
                          className="mt-2 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="flex gap-4 pb-3">
                        <MessageSquare
                          className={`w-5 h-5 mt-1 transition-colors duration-300 ${focusedField === "message" ? "text-shinest-blue" : "text-gray-400"}`}
                        />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          rows={4}
                          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-sans text-lg resize-none"
                          placeholder="Proje detaylarınızı bize anlatın..."
                        />
                      </div>
                      <div
                        className={`h-px transition-all duration-300 ${focusedField === "message" ? "bg-shinest-blue" : "bg-gray-200"}`}
                      />
                    </motion.div>
                  </div>

                  {/* Submit Button - Düzeltilmiş timing */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-transparent border-2 border-shinest-blue text-shinest-blue py-4 px-6 rounded-2xl font-medium overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:text-white"
                    >
                      {/* Arka plan fill animasyonu - gecikme ile */}
                      <div className="absolute inset-0 bg-shinest-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-left rounded-2xl delay-75" />

                      <div className="relative flex items-center justify-center gap-3 z-10 transition-colors duration-200">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Gönderiliyor...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            <span>Teklif Al</span>
                          </>
                        )}
                      </div>
                    </button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
