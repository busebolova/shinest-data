"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&query=elegant interior design studio workspace with architectural drawings"
                alt="About Shinest"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="font-display text-4xl md:text-5xl text-[#c4975a]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hakkımızda
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="font-serif text-lg text-[#8b7355] leading-relaxed">
                SHINEST İç Mimarlık, lüks yaşam alanları tasarlama konusunda uzmanlaşmış, yenilikçi ve estetik çözümler
                sunan bir tasarım stüdyosudur.
              </p>

              <p className="font-serif text-lg text-[#8b7355] leading-relaxed">
                Her projede zarafet, işlevsellik ve kişisel tarzı harmanlayarak, müşterilerimizin hayallerini gerçeğe
                dönüştürüyoruz.
              </p>

              <p className="font-serif text-lg text-[#8b7355] leading-relaxed">
                Dünya çapında projeler gerçekleştiren ekibimiz, en son tasarım trendlerini takip ederek, zamansız ve şık
                iç mekanlar yaratmaktadır.
              </p>
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="font-handwriting text-2xl text-[#c4975a]">"Tasarım, yaşamın kendisidir..."</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
