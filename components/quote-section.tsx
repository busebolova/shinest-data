"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useQuoteForm } from "@/contexts/quote-form-context"
import { ArrowRight, Phone, Mail } from "lucide-react"

export function QuoteSection() {
  const ref = useRef(null)
  const { openForm } = useQuoteForm()

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#15415b] to-[#1a4d6b] text-white relative overflow-hidden"
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hayalinizdeki Mekanı Birlikte Tasarlayalım
          </h2>

          <p className="font-sans text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Size özel tasarım çözümleri için ücretsiz keşif görüşmesi yapıyoruz
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={openForm}
              size="lg"
              className="bg-white text-[#15415b] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans flex items-center space-x-2"
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-6">
              <a
                href="tel:+905551234567"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                <span className="font-sans">+90 555 123 45 67</span>
              </a>
              <a
                href="mailto:info@shinest.com.tr"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span className="font-sans">info@shinest.com.tr</span>
              </a>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 font-sans text-sm opacity-80"
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
