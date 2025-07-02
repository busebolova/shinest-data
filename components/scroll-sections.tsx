"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const luxuryImages = [
  // Ultra Lüks Gerçek Görsel Layout - 16 Görsel
  {
    id: 1,
    src: "https://plus.unsplash.com/premium_photo-1671269943771-63db2ab54bf2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hero Luxury Interior",
    gridClass: "col-start-1 col-end-3 row-start-1 row-end-4", // Büyük sol blok
    zIndex: "z-20",
  },
  {
    id: 2,
    src: "https://aebeleinteriors.com/wp-content/uploads/2020/09/aebele-hero-1-800x1146.webp",
    alt: "İç tasarım karanlık oturma odası",
    gridClass: "col-start-3 col-end-5 row-start-1 row-end-3", // Orta üst
    zIndex: "z-10",
  },
  {
    id: 3,
    src: "https://aebeleinteriors.com/wp-content/uploads/2020/09/aebele-hero-2-800x1158.webp",
    alt: "İç tasarım altın dalga boyama",
    gridClass: "col-start-5 col-end-7 row-start-1 row-end-2", // Sağ üst küçük
    zIndex: "z-15",
  },
  {
    id: 4,
    src: "https://aebeleinteriors.com/wp-content/uploads/2020/08/old-town-boutique-hotel-013-800x1147.webp",
    alt: "İç tasarım parlak banyo mermer beyaz altın detaylar",
    gridClass: "col-start-3 col-end-4 row-start-3 row-end-6", // Orta dikey
    zIndex: "z-25",
  },
  {
    id: 5,
    src: "https://aebeleinteriors.com/wp-content/uploads/2020/08/seaside-apartment-001-800x628.webp",
    alt: "İç tasarım bej kahverengi banyo lüks detaylar",
    gridClass: "col-start-4 col-end-6 row-start-2 row-end-4", // Geniş yatay
    zIndex: "z-12",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=800",
    alt: "Lüks Modern Ofis",
    gridClass: "col-start-1 col-end-3 row-start-4 row-end-6", // Sol alt kare
    zIndex: "z-18",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=600",
    alt: "Şık Yemek Odası",
    gridClass: "col-start-4 col-end-6 row-start-4 row-end-6", // Orta alt
    zIndex: "z-14",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=1200&width=600",
    alt: "Lüks Giyinme Odası",
    gridClass: "col-start-6 col-end-7 row-start-2 row-end-6", // Sağ uzun dikey
    zIndex: "z-16",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=600",
    alt: "Lüks Spa Banyosu",
    gridClass: "col-start-5 col-end-6 row-start-2 row-end-3", // Sağ orta küçük
    zIndex: "z-13",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=400&width=1200",
    alt: "Premium Şarap Mahzeni",
    gridClass: "col-start-1 col-end-4 row-start-6 row-end-7", // Alt sol geniş
    zIndex: "z-11",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=400&width=800",
    alt: "Lüks Ev Sineması",
    gridClass: "col-start-4 col-end-6 row-start-6 row-end-7", // Alt orta
    zIndex: "z-17",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Şık Tuvalet",
    gridClass: "col-start-6 col-end-7 row-start-6 row-end-7", // Alt sağ küçük
    zIndex: "z-19",
  },
  {
    id: 13,
    src: "/placeholder.svg?height=600&width=600",
    alt: "Lüks Balkon Terası",
    gridClass: "col-start-7 col-end-8 row-start-1 row-end-3", // 7. sütun üst
    zIndex: "z-21",
  },
  {
    id: 14,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Premium Kütüphane",
    gridClass: "col-start-7 col-end-8 row-start-3 row-end-5", // 7. sütun orta
    zIndex: "z-22",
  },
  {
    id: 15,
    src: "/placeholder.svg?height=600&width=600",
    alt: "Lüks Giriş Holü",
    gridClass: "col-start-7 col-end-8 row-start-5 row-end-7", // 7. sütun alt
    zIndex: "z-23",
  },
  {
    id: 16,
    src: "/placeholder.svg?height=1800&width=600",
    alt: "Muhteşem Lüks Penthouse",
    gridClass: "col-start-8 col-end-9 row-start-1 row-end-7", // EN SAĞ TAM DİKEY
    zIndex: "z-30",
  },
]

export default function ScrollSections() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // 16'lı görsel için timing
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.95], [0, 1, 1])
  const opacity2 = useTransform(scrollYProgress, [0.03, 0.08, 0.95], [0, 1, 1])
  const opacity3 = useTransform(scrollYProgress, [0.06, 0.11, 0.95], [0, 1, 1])
  const opacity4 = useTransform(scrollYProgress, [0.09, 0.14, 0.95], [0, 1, 1])
  const opacity5 = useTransform(scrollYProgress, [0.12, 0.17, 0.95], [0, 1, 1])
  const opacity6 = useTransform(scrollYProgress, [0.15, 0.2, 0.95], [0, 1, 1])
  const opacity7 = useTransform(scrollYProgress, [0.18, 0.23, 0.95], [0, 1, 1])
  const opacity8 = useTransform(scrollYProgress, [0.21, 0.26, 0.95], [0, 1, 1])
  const opacity9 = useTransform(scrollYProgress, [0.24, 0.29, 0.95], [0, 1, 1])
  const opacity10 = useTransform(scrollYProgress, [0.27, 0.32, 0.95], [0, 1, 1])
  const opacity11 = useTransform(scrollYProgress, [0.3, 0.35, 0.95], [0, 1, 1])
  const opacity12 = useTransform(scrollYProgress, [0.33, 0.38, 0.95], [0, 1, 1])
  const opacity13 = useTransform(scrollYProgress, [0.36, 0.41, 0.95], [0, 1, 1])
  const opacity14 = useTransform(scrollYProgress, [0.39, 0.44, 0.95], [0, 1, 1])
  const opacity15 = useTransform(scrollYProgress, [0.42, 0.47, 0.95], [0, 1, 1])
  const opacity16 = useTransform(scrollYProgress, [0.45, 0.5, 0.95], [0, 1, 1])

  // Hareket efektleri - ÆBELE tarzı transform'lar
  const y1 = useTransform(scrollYProgress, [0, 0.05], [100, 0])
  const y2 = useTransform(scrollYProgress, [0.03, 0.08], [-200, 0]) // ÆBELE hero-1 tarzı
  const y3 = useTransform(scrollYProgress, [0.06, 0.11], [80, 0])
  const y4 = useTransform(scrollYProgress, [0.09, 0.14], [-125, 0]) // ÆBELE hero-3 tarzı
  const y5 = useTransform(scrollYProgress, [0.12, 0.17], [-333, 0]) // ÆBELE hero-4 tarzı
  const y6 = useTransform(scrollYProgress, [0.15, 0.2], [-50, 0])
  const y7 = useTransform(scrollYProgress, [0.18, 0.23], [60, 0])
  const y8 = useTransform(scrollYProgress, [0.21, 0.26], [-30, 0])
  const y9 = useTransform(scrollYProgress, [0.24, 0.29], [45, 0])
  const y10 = useTransform(scrollYProgress, [0.27, 0.32], [-35, 0])
  const y11 = useTransform(scrollYProgress, [0.3, 0.35], [55, 0])
  const y12 = useTransform(scrollYProgress, [0.33, 0.38], [-25, 0])
  const y13 = useTransform(scrollYProgress, [0.36, 0.41], [40, 0])
  const y14 = useTransform(scrollYProgress, [0.39, 0.44], [-45, 0])
  const y15 = useTransform(scrollYProgress, [0.42, 0.47], [35, 0])
  const y16 = useTransform(scrollYProgress, [0.45, 0.5], [120, 0])

  // Scale efektleri
  const scale1 = useTransform(scrollYProgress, [0, 0.05], [0.9, 1])
  const scale2 = useTransform(scrollYProgress, [0.03, 0.08], [0.95, 1])
  const scale3 = useTransform(scrollYProgress, [0.06, 0.11], [0.88, 1])
  const scale4 = useTransform(scrollYProgress, [0.09, 0.14], [0.92, 1])
  const scale5 = useTransform(scrollYProgress, [0.12, 0.17], [0.94, 1])
  const scale6 = useTransform(scrollYProgress, [0.15, 0.2], [0.86, 1])
  const scale7 = useTransform(scrollYProgress, [0.18, 0.23], [0.91, 1])
  const scale8 = useTransform(scrollYProgress, [0.21, 0.26], [0.89, 1])
  const scale9 = useTransform(scrollYProgress, [0.24, 0.29], [0.93, 1])
  const scale10 = useTransform(scrollYProgress, [0.27, 0.32], [0.87, 1])
  const scale11 = useTransform(scrollYProgress, [0.3, 0.35], [0.9, 1])
  const scale12 = useTransform(scrollYProgress, [0.33, 0.38], [0.96, 1])
  const scale13 = useTransform(scrollYProgress, [0.36, 0.41], [0.85, 1])
  const scale14 = useTransform(scrollYProgress, [0.39, 0.44], [0.88, 1])
  const scale15 = useTransform(scrollYProgress, [0.42, 0.47], [0.92, 1])
  const scale16 = useTransform(scrollYProgress, [0.45, 0.5], [0.85, 1])

  const opacities = [
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    opacity5,
    opacity6,
    opacity7,
    opacity8,
    opacity9,
    opacity10,
    opacity11,
    opacity12,
    opacity13,
    opacity14,
    opacity15,
    opacity16,
  ]
  const yValues = [y1, y2, y3, y4, y5, y6, y7, y8, y9, y10, y11, y12, y13, y14, y15, y16]
  const scaleValues = [
    scale1,
    scale2,
    scale3,
    scale4,
    scale5,
    scale6,
    scale7,
    scale8,
    scale9,
    scale10,
    scale11,
    scale12,
    scale13,
    scale14,
    scale15,
    scale16,
  ]

  return (
    <section ref={containerRef} className="min-h-[120vh] bg-[#f5f3f0] relative overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-[#c4975a] mb-4">Yeni Başlangıç</h2>
          <p className="font-sans text-lg text-[#8b7355]">Scroll sections temizlendi, yeni tasarım için hazır</p>
        </motion.div>
      </div>
      <div className="w-full h-full relative">
        <div className="grid grid-cols-8 grid-rows-6 gap-2 h-full w-full p-2">
          {luxuryImages.map((image, index) => (
            <motion.div
              key={image.id}
              style={{
                opacity: opacities[index],
                y: yValues[index],
                scale: scaleValues[index],
              }}
              className={`${image.gridClass} ${image.zIndex} relative overflow-hidden rounded-xl`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 5}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#C19A5B]/8 to-transparent" />

              {/* Premium hover effect */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-500 opacity-0 hover:opacity-100" />

              {/* ÆBELE tarzı etiketler */}
              {index === 0 && (
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <p className="font-display text-sm text-[#C19A5B] bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    Featured
                  </p>
                </div>
              )}

              {/* Gerçek görseller için özel etiketler */}
              {index === 1 && (
                <div className="absolute top-4 left-4 text-white z-10">
                  <p className="font-display text-xs text-[#C19A5B] bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                    ÆBELE Style
                  </p>
                </div>
              )}

              {index === 15 && (
                <div className="absolute top-4 left-4 text-white z-10">
                  <p className="font-display text-sm text-[#C19A5B] bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    Penthouse
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ÆBELE Tarzı Dekoratif Elementler */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-4 h-4 border border-[#C19A5B] rounded-full opacity-25 z-40"
          animate={{
            opacity: [0.25, 0.5, 0.25],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[20%] left-[50%] w-3 h-3 bg-[#C19A5B] rounded-full opacity-20 z-40"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <motion.div
          className="absolute top-[60%] left-[75%] w-2 h-2 border border-[#C19A5B] opacity-30 z-40"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-[30%] left-[85%] w-1.5 h-1.5 bg-[#C19A5B] rounded-full opacity-35 z-40"
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* ÆBELE Premium Overlay Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#C19A5B]/3 to-transparent pointer-events-none z-5" />

        {/* Luxury grid lines effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C19A5B]/5 to-transparent pointer-events-none z-5" />
      </div>
    </section>
  )
}
