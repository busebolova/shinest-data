"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface HandwritingAnimationProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export default function HandwritingAnimation({
  text,
  className = "",
  delay = 0,
  duration = 3,
}: HandwritingAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isWriting, setIsWriting] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsWriting(true)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  // Create SVG path for handwriting effect
  const createHandwritingPath = (text: string) => {
    const pathLength = text.length * 50 // Approximate path length
    const curves = []

    for (let i = 0; i < text.length; i++) {
      const x = i * 40 + 20
      const y = 50 + Math.sin(i * 0.5) * 10 // Natural handwriting curve
      const nextX = (i + 1) * 40 + 20
      const nextY = 50 + Math.sin((i + 1) * 0.5) * 10

      // Create bezier curve for natural handwriting flow
      const controlX1 = x + 15
      const controlY1 = y - 5
      const controlX2 = nextX - 15
      const controlY2 = nextY + 5

      if (i === 0) {
        curves.push(`M${x},${y}`)
      }
      curves.push(`C${controlX1},${controlY1} ${controlX2},${controlY2} ${nextX},${nextY}`)
    }

    return curves.join(" ")
  }

  const pathData = createHandwritingPath(text)
  const pathLength = text.length * 50

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* SVG Handwriting Path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${text.length * 40 + 40} 100`}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Main writing path */}
        <motion.path
          d={pathData}
          stroke="#c4975a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          initial={{
            strokeDashoffset: pathLength,
            opacity: 0,
          }}
          animate={
            isWriting
              ? {
                  strokeDashoffset: 0,
                  opacity: 0.6,
                }
              : {
                  strokeDashoffset: pathLength,
                  opacity: 0,
                }
          }
          transition={{
            duration: duration,
            ease: "easeInOut",
          }}
        />

        {/* Secondary decorative strokes */}
        <motion.path
          d={pathData}
          stroke="#c4975a"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          initial={{
            strokeDashoffset: pathLength,
            opacity: 0,
          }}
          animate={
            isWriting
              ? {
                  strokeDashoffset: 0,
                  opacity: 0.3,
                }
              : {
                  strokeDashoffset: pathLength,
                  opacity: 0,
                }
          }
          transition={{
            duration: duration,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        {/* Ink dots and flourishes */}
        {[...Array(Math.min(5, text.length))].map((_, i) => (
          <motion.circle
            key={i}
            cx={i * (text.length * 8) + 30}
            cy={55 + Math.random() * 10}
            r="1.5"
            fill="#c4975a"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isWriting
                ? {
                    scale: [0, 1.2, 0.8],
                    opacity: [0, 0.7, 0.4],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.6,
              delay: duration * 0.3 + i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Animated Text */}
      <motion.span
        className="relative z-10 font-handwriting text-[#c4975a] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isWriting ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={
              isWriting
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                  }
            }
            transition={{
              duration: 0.2,
              delay: 0.5 + index * 0.1,
              ease: "easeOut",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>

      {/* Writing Pen Effect */}
      <motion.div
        className="absolute top-1/2 w-2 h-8 bg-[#c4975a] rounded-full opacity-70 z-20"
        style={{
          transform: "translateY(-50%) rotate(45deg)",
          transformOrigin: "bottom center",
        }}
        initial={{
          left: "0%",
          opacity: 0,
          scale: 0,
        }}
        animate={
          isWriting
            ? {
                left: ["0%", "100%"],
                opacity: [0, 0.8, 0.8, 0],
                scale: [0, 1, 1, 0.5],
                rotate: [45, 35, 45, 50],
              }
            : {
                opacity: 0,
                scale: 0,
              }
        }
        transition={{
          duration: duration,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Paper texture overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c4975a]/5 to-transparent pointer-events-none rounded-lg"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          isWriting
            ? {
                opacity: 1,
                scaleX: 1,
              }
            : {
                opacity: 0,
                scaleX: 0,
              }
        }
        transition={{
          duration: duration * 0.8,
          delay: 0.3,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
