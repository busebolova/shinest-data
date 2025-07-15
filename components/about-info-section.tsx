"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function AboutInfoSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Ana Açıklama Metni - Yeni ve Farklı */}
          <motion.p
            className="font-sans text-lg md:text-xl text-[#2a2a2a] leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her projede özgün tasarım anlayışımızla, işlevsellik ve
            estetiği mükemmel bir uyumda birleştirerek, sizin hikayenizi mekanlarınızda yaşatıyoruz. Hayallerinizden
            gerçeğe uzanan bu yolculukta, her detay özenle tasarlanır.
          </motion.p>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mt-10">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="About Shinest"
              fill
              className="object-cover"
              priority={true} // Add this line
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
