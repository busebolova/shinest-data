"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    designPackage: "",
    meetingType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    if (!formData.designPackage) newErrors.designPackage = "Tasarım paketi seçimi zorunludur"
    if (!formData.meetingType) newErrors.meetingType = "Görüşme şekli seçimi zorunludur"

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
        designPackage: "",
        meetingType: "",
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-display text-2xl text-shinest-blue">Teklif Formu</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display text-shinest-blue mb-2">Teşekkürler!</h3>
                    <p className="text-gray-600 mb-4">
                      Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                    <p className="text-sm text-gray-500">Bu pencere otomatik olarak kapanacaktır.</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="mb-8 text-[#2a2a2a]">
                    <p className="text-gray-600">
                      Hayalinizdeki yaşam alanını birlikte tasarlamak için formu doldurun. En kısa sürede sizinle
                      iletişime geçeceğiz.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          İsim Soyisim <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue ${
                            errors.fullName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Adınız Soyadınız"
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="05XX XXX XX XX"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="ornek@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="designPackage" className="block text-sm font-medium text-gray-700 mb-1">
                        Tasarım Paketi <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="designPackage"
                        name="designPackage"
                        value={formData.designPackage}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue ${
                          errors.designPackage ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Seçiniz</option>
                        <option value="Işıltı (Konut)">Işıltı (Konut)</option>
                        <option value="Işıltı Pro (Konut)">Işıltı Pro (Konut)</option>
                        <option value="Parıltı (Konut)">Parıltı (Konut)</option>
                        <option value="Zarafet (Konut)">Zarafet (Konut)</option>
                        <option value="Diva (Konut)">Diva (Konut)</option>
                        <option value="İkon (Ticari)">İkon (Ticari)</option>
                        <option value="Elit (Ticari)">Elit (Ticari)</option>
                        <option value="Star (Ticari)">Star (Ticari)</option>
                        <option value="İncelemedim">İncelemedim</option>
                      </select>
                      {errors.designPackage && <p className="mt-1 text-sm text-red-500">{errors.designPackage}</p>}
                    </div>

                    <div>
                      <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700 mb-1">
                        Görüşme Şekli <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="meetingType"
                            value="Yazılı iletişim"
                            checked={formData.meetingType === "Yazılı iletişim"}
                            onChange={handleChange}
                            className="mr-2 text-shinest-blue"
                          />
                          <span>Yazılı iletişim</span>
                        </label>
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="meetingType"
                            value="Yerinde keşif"
                            checked={formData.meetingType === "Yerinde keşif"}
                            onChange={handleChange}
                            className="mr-2 text-shinest-blue"
                          />
                          <span>Yerinde keşif</span>
                        </label>
                      </div>
                      {errors.meetingType && <p className="mt-1 text-sm text-red-500">{errors.meetingType}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mesajınız
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue border-gray-300"
                        placeholder="Projeniz hakkında detayları buraya yazabilirsiniz..."
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-shinest-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-shinest-blue/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Gönderiliyor...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Teklif Al</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
