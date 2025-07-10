"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function AboutInfoSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Burada e-posta kaydetme işlemi yapılabilir
      setIsSubmitted(true)
      setEmail("")

      // 3 saniye sonra mesajı gizle
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Ana Açıklama Metni */}
          <motion.p
            className="font-sans text-lg md:text-xl text-[#2a2a2a] leading-relaxed max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Yeni projeler, tasarım trendleri ve özel içerikler için bültenimize katılın
          </motion.p>

          {/* İlham Bülteni Başlığı */}
          <motion.h3
            className="font-display text-3xl md:text-4xl text-shinest-blue mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            İlham Bülteni
          </motion.h3>

          {/* E-posta Formu */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {isSubmitted ? (
              <motion.div
                className="bg-green-50 border border-green-200 rounded-full px-6 py-3 text-green-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                ✓ Başarıyla kaydolundu! Teşekkür ederiz.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 px-5 py-3 border-2 border-shinest-blue/20 rounded-full text-shinest-blue placeholder-shinest-blue/60 focus:outline-none focus:border-shinest-blue transition-colors duration-300 bg-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-shinest-blue text-white rounded-full hover:bg-shinest-blue/90 transition-colors duration-300 flex items-center justify-center gap-2 font-medium whitespace-nowrap"
                >
                  <span>Katıl</span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
