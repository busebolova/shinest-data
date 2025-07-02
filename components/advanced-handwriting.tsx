"use client"

// Tamamen yeni bir implementasyon ile değiştirelim

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface AdvancedHandwritingProps {
  text?: string
  pathData?: string
  className?: string
  strokeColor?: string
  strokeWidth?: number
  animationDuration?: number
  delay?: number
  viewBox?: string
}

export default function AdvancedHandwriting({
  text,
  pathData,
  className = "",
  strokeColor = "#c4975a",
  strokeWidth = 2.5,
  animationDuration = 4,
  delay = 0.5,
  viewBox = "0 0 800 150",
}: AdvancedHandwritingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [isWriting, setIsWriting] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsWriting(true)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  // Eğer pathData verilmemişse ve text varsa basit bir path oluştur
  const defaultPath = pathData || (text ? `M50,75 Q200,25 400,75 Q600,25 750,75` : "")

  // Path uzunluğunu hesapla
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(1000)

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
  }, [defaultPath])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* SVG Container */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        {/* Ana çizgi animasyonu */}
        <motion.path
          ref={pathRef}
          d={defaultPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isWriting ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: animationDuration, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        />

        {/* İnce detay çizgisi */}
        <motion.path
          d={defaultPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          animate={isWriting ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            pathLength: { duration: animationDuration * 0.9, ease: "easeInOut", delay: 0.1 },
          }}
        />

        {/* Işık efekti */}
        <motion.path
          d={defaultPath}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth * 0.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={isWriting ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            pathLength: { duration: animationDuration * 0.8, ease: "easeInOut", delay: 0.2 },
          }}
        />
      </svg>

      {/* Metin içeriği (eğer varsa) */}
      {text && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-handwriting text-[#c4975a]"
          initial={{ opacity: 0 }}
          animate={isWriting ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: animationDuration * 0.5 }}
        >
          {text}
        </motion.div>
      )}
    </div>
  )
}
