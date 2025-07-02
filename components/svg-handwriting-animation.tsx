"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface SVGHandwritingAnimationProps {
  paths: string[]
  className?: string
  strokeColor?: string
  strokeWidth?: number
  viewBox?: string
  animationDuration?: number
  delay?: number
}

export default function SVGHandwritingAnimation({
  paths,
  className = "",
  strokeColor = "#cfaf76",
  strokeWidth = 6,
  viewBox = "0 0 1920 1080",
  animationDuration = 3.5,
  delay = 1.0,
}: SVGHandwritingAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 0 15px rgba(207, 175, 118, 0.4))`,
        }}
      >
        {paths.map((pathData, index) => (
          <g key={index}>
            {/* Ana çizgi - Kalın */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isAnimating ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: {
                  duration: animationDuration + index * 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.2,
                },
                opacity: {
                  duration: 0.5,
                  delay: index * 0.2,
                },
              }}
            />

            {/* İnce detay çizgisi */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.6}
              initial={{ pathLength: 0 }}
              animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                pathLength: {
                  duration: (animationDuration + index * 0.3) * 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.2 + 0.1,
                },
              }}
            />

            {/* Işık efekti */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth * 0.15}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
              initial={{ pathLength: 0 }}
              animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                pathLength: {
                  duration: (animationDuration + index * 0.3) * 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.2 + 0.2,
                },
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
