"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import SVGHandwriting from "./svg-handwriting"

export default function HandwritingShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)

  // Referans SVG'den alınan path'ler
  const paths = [
    {
      d: "M439,71.75 C439,71.75 417.75,91 426.25,91 C434.75,91 445.25,81.75 445.25,81.75 C445.25,81.75 462,48.5 462,48.5 C462,48.5 447.25,64 447.25,64 C447.25,64 477.75,60 477.75,60 C477.75,60 474,74 474,74 C474,74 476.75,67.5 470.75,68.25 C464.75,69 444.75,82.25 446.25,96.5 C449.25,99.25 466.5,86.25 470,81.75 C473.75,78.5 481.25,71 485.25,72 C489.25,73 490.5,85 479.75,101.5",
      strokeWidth: 6.2,
      duration: 3,
    },
    {
      d: "M407.25,90.75 C407.25,90.75 398.5,104.25 391,106.25 C383.5,108.25 377.75,108.5 384.25,101 C390.75,93.5 400.5,90.25 400.5,90.25 C400.5,90.25 414.38,83.221 414.38,83.221 C414.38,83.221 437,74.5 437,74.5",
      strokeWidth: 6.2,
      delay: 3,
      duration: 2,
    },
    {
      d: "M421,69 C421,69 424.75,65.5 425,61.5 C425.25,57.5 419.25,60.5 415,61.25 C410.75,62 407.25,64.75 408.25,74.75 C409.25,84.75 409.75,87.25 406,92.75",
      strokeWidth: 6.2,
      delay: 5,
      duration: 2,
    },
    {
      d: "M367.5,81 C367.5,81 375.75,80.75 381,75.75 C386.25,70.75 393,64.25 388.75,62 C384.5,59.75 359.25,73.75 360.5,92 C360.953,98.612 368.574,99.386 376.836,96.09 C391.378,90.288 409.75,74 409.75,74",
      strokeWidth: 6.2,
      delay: 7,
      duration: 3,
    },
  ]

  return (
    <div className="bg-[#f9f7f4] p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-display text-shinest-blue mb-6 text-center">Handwriting Animasyonu</h3>

      <div className="relative h-[200px] mb-8 border border-gray-100 rounded-lg bg-white/50">
        <SVGHandwriting paths={paths} strokeColor="#c4975a" viewBox="350 40 150 80" className="w-full h-full" />
      </div>

      <div className="flex justify-center">
        <motion.button
          className="px-6 py-2 bg-shinest-blue text-white rounded-full font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Sayfayı yenileyerek animasyonu tekrar başlat
            window.location.reload()
          }}
        >
          Animasyonu Tekrarla
        </motion.button>
      </div>
    </div>
  )
}
