"use client"

import { useState, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Github, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push("/admin")
      }
    }
    checkSession()
  }, [router])

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      switch (errorParam) {
        case "Configuration":
          setError("Server configuration error. Please contact support.")
          break
        case "AccessDenied":
          setError("Access denied. You do not have permission to access this area.")
          break
        case "Verification":
          setError("Verification failed. Please try again.")
          break
        default:
          setError("An authentication error occurred. Please try again.")
      }
    }
  }, [searchParams])

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn("github", {
        callbackUrl: "/admin",
        redirect: false,
      })

      if (result?.error) {
        setError("Failed to sign in with GitHub. Please try again.")
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
            <span className="block sm:inline">{error}</span>
          </motion.div>
        )}

        <Button
          onClick={handleGitHubSignIn}
          disabled={isLoading}
          className="w-full bg-shinest-blue hover:bg-shinest-blue/90 text-white py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Github className="w-5 h-5" />}
          <span>{isLoading ? "Giriş yapılıyor..." : "GitHub ile Giriş Yap"}</span>
        </Button>

        <div className="mt-6 text-sm text-gray-500">
          <p>Sorun yaşıyorsanız, lütfen GitHub hesabınızın aktif olduğundan emin olun.</p>
        </div>
      </motion.div>
    </div>
  )
}
