"use client"

import { signIn } from "@/auth" // Import signIn from the generated route
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"

export default function AdminLoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3f0]">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display text-3xl text-shinest-blue mb-6">Admin Girişi</h1>
        <p className="font-sans text-gray-600 mb-8">Yönetim paneline erişmek için GitHub hesabınızla giriş yapın.</p>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="block sm:inline">Yetkisiz erişim. Lütfen doğru GitHub hesabıyla giriş yapın.</span>
          </motion.div>
        )}

        <Button
          onClick={() => signIn("github")}
          className="w-full bg-shinest-blue hover:bg-shinest-blue/90 text-white py-3 flex items-center justify-center gap-2"
        >
          <Github className="w-5 h-5" />
          <span>GitHub ile Giriş Yap</span>
        </Button>
      </motion.div>
    </div>
  )
}
