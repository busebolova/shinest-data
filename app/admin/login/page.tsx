"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { toast } from "sonner"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    if (email === "admin@shinesticmimarlik.com" && password === "shinest2024") {
      localStorage.setItem("admin_logged_in", "true")
      toast.success("Başarıyla giriş yapıldı!")
      router.push("/admin")
    } else {
      setError("E-posta veya şifre hatalı!")
      toast.error("Giriş başarısız!")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src="/images/logo1.png" alt="SHINEST" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Panel</h2>
          <p className="mt-2 text-sm text-gray-600">SHINEST İç Mimarlık Yönetim Paneli</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>Admin paneline erişmek için giriş yapın</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shinesticmimarlik.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Şifre</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifrenizi girin"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Giriş Yap
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Giriş Bilgileri:</h3>
              <p className="text-sm text-blue-700">
                <strong>E-posta:</strong> admin@shinesticmimarlik.com
              </p>
              <p className="text-sm text-blue-700">
                <strong>Şifre:</strong> shinest2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
