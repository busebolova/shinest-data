"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function AdminLoadingSpinner() {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Loader2 className="w-12 h-12 animate-spin text-shinest-blue mx-auto mb-4" />
        <p className="font-sans text-lg text-shinest-blue">Yükleniyor...</p>
      </motion.div>
    </motion.div>
  )
}
