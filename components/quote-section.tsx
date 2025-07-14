"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useQuoteForm } from "@/contexts/quote-form-context"
import { useLanguage } from "@/contexts/language-context"
import { useInView } from "react-intersection-observer" // Import useInView from react-intersection-observer
import { useState } from "react" // Import useState from react

export function QuoteSection() {
  const ref = useRef(null)
  const { isInView } = useInView(ref, { once: true, margin: "-100px" }) // Declare useInView
  const { openForm } = useQuoteForm()
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
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#c4975a] to-[#b8895a] text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hayalinizdeki Mekanı Birlikte Tasarlayalım
          </h2>

          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Size özel tasarım çözümleri için ücretsiz keşif görüşmesi yapıyoruz
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              onClick={openForm}
              size="lg"
              className="bg-white text-[#c4975a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ücretsiz Teklif Al
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-sm opacity-80"
          >
            24 saat içinde size dönüş yapıyoruz
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-6 h-6 bg-white/15 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  )
}

export default QuoteSection
