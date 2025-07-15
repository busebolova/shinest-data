"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"
import { getWhatsAppURL } from "@/utils/whatsapp" // Import the updated utility

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppRedirect = () => {
    // Basic validation before redirecting
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.designPackage ||
      !formData.meetingType
    ) {
      alert("Lütfen tüm zorunlu alanları doldurunuz (İsim Soyisim, Telefon, E-posta, Tasarım Paketi, Görüşme Şekli).")
      return
    }

    const whatsappUrl = getWhatsAppURL(formData)
    window.open(whatsappUrl, "_blank")
    onClose() // Close modal after redirect
    // Optionally reset form data
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      designPackage: "",
      meetingType: "",
      message: "",
    })
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

              <>
                <div className="mb-8 text-[#2a2a2a]">
                  <p className="text-gray-600">
                    Hayalinizdeki yaşam alanını birlikte tasarlamak için formu doldurun. Bilgileriniz WhatsApp üzerinden
                    bize iletilecektir.
                  </p>
                </div>

                {/* Form elements remain, but submission logic is handled by button click */}
                <div className="space-y-6">
                  {" "}
                  {/* Changed from <form> to <div> */}
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
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue border-gray-300`}
                        placeholder="Adınız Soyadınız"
                      />
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
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue border-gray-300`}
                        placeholder="05XX XXX XX XX"
                      />
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
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue border-gray-300`}
                      placeholder="ornek@email.com"
                    />
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
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-shinest-blue border-gray-300`}
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
                      type="button" // Changed to type="button"
                      onClick={handleWhatsAppRedirect} // Added onClick handler
                      className="w-full bg-shinest-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-shinest-blue/90 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Teklif Al (WhatsApp)</span>
                    </button>
                  </div>
                </div>
              </>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
