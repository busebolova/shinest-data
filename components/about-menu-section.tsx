"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function AboutMenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/modern-architecture.jpg"
                alt="Modern İç Mimarlık"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl lg:text-5xl font-bold text-[#15415b] leading-tight"
            >
              Modern Tasarım Anlayışı
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-lg text-gray-600 leading-relaxed"
            >
              Her projede, müşterilerimizin yaşam tarzını ve kişisel zevklerini yansıtan, özgün ve işlevsel mekanlar
              yaratıyoruz. Minimalist yaklaşımımız ile maksimum konfor sağlıyoruz.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-sans text-lg text-gray-600 leading-relaxed"
            >
              Sürdürülebilir materyallerle çevre dostu tasarımlar geliştiriyor, teknoloji ile estetik uyumu yakalıyoruz.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-3 font-sans text-gray-600"
            >
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#15415b] rounded-full mr-3"></span>
                Kişiye özel tasarım çözümleri
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#15415b] rounded-full mr-3"></span>
                Sürdürülebilir malzeme kullanımı
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#15415b] rounded-full mr-3"></span>
                3D görselleştirme hizmeti
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#15415b] rounded-full mr-3"></span>
                Proje yönetimi ve uygulama
              </li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMenuSection
