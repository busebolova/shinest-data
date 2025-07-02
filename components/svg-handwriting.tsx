"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface SVGHandwritingProps {
  paths: {
    d: string
    strokeWidth?: number
    delay?: number
    duration?: number
  }[]
  className?: string
  strokeColor?: string
  viewBox?: string
}

export default function SVGHandwriting({
  paths,
  className = "",
  strokeColor = "#c4975a",
  viewBox = "0 0 800 150",
}: SVGHandwritingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        {paths.map((path, index) => (
          <g key={index}>
            {/* Ana çizgi */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={path.strokeWidth || 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isAnimating ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: {
                  duration: path.duration || 2.5,
                  ease: "easeInOut",
                  delay: path.delay || 0,
                },
                opacity: {
                  duration: 0.5,
                  delay: path.delay || 0,
                },
              }}
            />

            {/* İnce detay çizgisi */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={(path.strokeWidth || 3) * 0.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                pathLength: {
                  duration: (path.duration || 2.5) * 0.9,
                  ease: "easeInOut",
                  delay: (path.delay || 0) + 0.1,
                },
              }}
            />

            {/* Işık efekti */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="white"
              strokeWidth={(path.strokeWidth || 3) * 0.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                pathLength: {
                  duration: (path.duration || 2.5) * 0.8,
                  ease: "easeInOut",
                  delay: (path.delay || 0) + 0.2,
                },
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
