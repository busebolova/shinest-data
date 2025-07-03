"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, Clock, User, MessageSquare } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function QuoteSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // WhatsApp integration
      const whatsappMessage = `
Yeni Teklif Talebi:
İsim: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}
Hizmet: ${formData.service}
Mesaj: ${formData.message}
      `.trim()

      const whatsappUrl = `https://wa.me/905321234567?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, "_blank")

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <section className="py-20 bg-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display text-white mb-6">{t("quote.title")}</h2>
              <p className="text-xl text-blue-100 leading-relaxed">{t("quote.subtitle")}</p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Telefon</p>
                  <a
                    href="tel:+902321234567"
                    className="text-white text-lg font-medium hover:text-blue-200 transition-colors"
                  >
                    +90 (232) 123 45 67
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">E-posta</p>
                  <a
                    href="mailto:info@shinest.com.tr"
                    className="text-white text-lg font-medium hover:text-blue-200 transition-colors"
                  >
                    info@shinest.com.tr
                  </a>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Adres</p>
                  <p className="text-white text-lg font-medium">
                    Alsancak Mahallesi, Kordon Boyu No: 123
                    <br />
                    Konak, İzmir
                  </p>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Çalışma Saatleri</p>
                  <p className="text-white text-lg font-medium">
                    Pazartesi - Cuma: 09:00 - 18:00
                    <br />
                    Cumartesi: 10:00 - 16:00
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-display text-blue-900 mb-2">Ücretsiz Teklif Alın</h3>
              <p className="text-gray-600">Projeniz hakkında detaylı bilgi alın</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-900 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Adınızı ve soyadınızı girin"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-posta *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="E-posta adresinizi girin"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-blue-900 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Telefon numaranızı girin"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-blue-900 mb-2">
                  Hizmet Türü
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Hizmet seçin</option>
                  <option value="interior-design">İç Mimarlık</option>
                  <option value="architecture">Mimarlık</option>
                  <option value="consultation">Danışmanlık</option>
                  <option value="project-management">Proje Yönetimi</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-900 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Projeniz hakkında detayları paylaşın"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Teklif Talep Et</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-green-800 text-sm">
                    ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-800 text-sm">❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
