"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Search, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [email, setEmail] = useState("")
  const shinestLetters = "SHINEST".split("")

  useEffect(() => {
    // Sayfa yüklendiğinde scroll'u en üste al
    window.scrollTo(0, 0)

    // State'leri reset et
    setIsLoaded(false)

    // Kısa bir delay sonra animasyonları başlat
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(initialTimer)
  }, [])

  const blogPosts = [
    {
      id: 1,
      title: "2024 İç Mimarlık Trendleri",
      excerpt: "Bu yılın en popüler iç mimarlık trendlerini keşfedin ve evinizi modern bir görünüme kavuşturun.",
      content:
        "2024 yılının en dikkat çeken iç mimarlık trendleri arasında sürdürülebilir malzemeler, doğal renkler ve çok fonksiyonlu mobilyalar yer alıyor...",
      author: "Shinest Ekibi",
      date: "15 Mart 2024",
      image: "/modern-interior-2024.png",
      tags: ["Trendler", "2024", "Modern"],
      featured: true,
    },
    {
      id: 2,
      title: "Küçük Mekanlar İçin Büyük Fikirler",
      excerpt: "Küçük yaşam alanlarını maksimum verimlilikle kullanmanın sırlarını öğrenin.",
      content:
        "Küçük mekanları büyük göstermenin en etkili yolları arasında akıllı depolama çözümleri, açık renkler ve çok amaçlı mobilyalar bulunuyor...",
      author: "Shinest Ekibi",
      date: "8 Mart 2024",
      image: "/small-space-interior.png",
      tags: ["Küçük Mekan", "Verimlilik", "Tasarım"],
      featured: false,
    },
    {
      id: 3,
      title: "Sürdürülebilir İç Mimarlık",
      excerpt: "Çevre dostu malzemeler ve sürdürülebilir tasarım yaklaşımları hakkında bilmeniz gerekenler.",
      content:
        "Sürdürülebilir iç mimarlık, çevreye duyarlı malzemeler kullanarak hem estetik hem de ekolojik açıdan sorumlu mekanlar yaratmayı hedefler...",
      author: "Shinest Ekibi",
      date: "1 Mart 2024",
      image: "/sustainable-interior.png",
      tags: ["Sürdürülebilir", "Çevre Dostu", "Yeşil Tasarım"],
      featured: true,
    },
    {
      id: 4,
      title: "Renk Psikolojisi ve İç Mekan",
      excerpt: "Renkler yaşam alanlarımızı nasıl etkiler ve doğru renk seçimi nasıl yapılır?",
      content:
        "Renkler sadece estetik bir tercih değil, aynı zamanda psikolojik etkiler yaratır. Doğru renk seçimi ile mekanlarınızı daha yaşanabilir hale getirebilirsiniz...",
      author: "Shinest Ekibi",
      date: "22 Şubat 2024",
      image: "/images/modern-living-room.jpeg",
      tags: ["Renk", "Psikoloji", "Tasarım"],
      featured: false,
    },
    {
      id: 5,
      title: "Aydınlatma Tasarımının Önemi",
      excerpt: "Doğru aydınlatma ile mekanlarınızı nasıl dönüştürebilirsiniz?",
      content:
        "Aydınlatma, iç mimarlığın en önemli unsurlarından biridir. Doğru aydınlatma tasarımı ile mekanlarınızın atmosferini tamamen değiştirebilirsiniz...",
      author: "Shinest Ekibi",
      date: "15 Şubat 2024",
      image: "/images/modern-kitchen-living.png",
      tags: ["Aydınlatma", "Atmosfer", "Tasarım"],
      featured: false,
    },
    {
      id: 6,
      title: "Minimalist Yaşam Alanları",
      excerpt: "Az ile çok yaratmanın sanatı: minimalist tasarım prensipleri.",
      content:
        "Minimalizm, sadece az eşya kullanmak değil, her öğenin anlamlı ve fonksiyonel olmasını sağlamaktır. Bu yaklaşım ile daha huzurlu mekanlar yaratabilirsiniz...",
      author: "Shinest Ekibi",
      date: "8 Şubat 2024",
      image: "/images/bedroom-design-1.png",
      tags: ["Minimalizm", "Huzur", "Fonksiyonellik"],
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic here
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f5f3f0]">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-shinest-blue"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Mobile Responsive */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* SHINEST - Yukarıdan gelen harf animasyonu */}
            <div className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] text-shinest-blue leading-[0.85] font-normal mb-6 md:mb-8 flex justify-center">
              {shinestLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Blog Başlığı - Kelime olarak animasyon */}
            <motion.div
              className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] flex justify-center font-display"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.8 }}
              transition={{
                duration: 1.2,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
            >
              Blog
            </motion.div>
          </motion.div>

          {/* Search Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Blog yazılarında ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 font-sans text-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <h2 className="text-2xl font-display font-bold text-shinest-blue mb-8 text-center">Öne Çıkan Yazılar</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 + index * 0.2, duration: 0.6 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#c4975a] text-white">Öne Çıkan</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <User className="w-4 h-4 mr-1" />
                          <span className="mr-4">{post.author}</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-shinest-blue mb-3 group-hover:text-[#c4975a] transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-sans text-[#2a2a2a] opacity-70 mb-4 leading-relaxed">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" className="text-shinest-blue hover:text-[#c4975a] p-0 font-sans">
                          Devamını Oku
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Posts */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <h2 className="text-2xl font-display font-bold text-shinest-blue mb-8 text-center">Tüm Yazılar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-shinest-blue mb-3 group-hover:text-[#c4975a] transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-sans text-[#2a2a2a] opacity-70 mb-4 leading-relaxed text-sm">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" className="text-shinest-blue hover:text-[#c4975a] p-0 font-sans text-sm">
                        Devamını Oku
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            className="py-16 px-8 bg-shinest-blue rounded-3xl text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            <Mail className="w-16 h-16 text-[#c4975a] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Yeni Yazılardan Haberdar Olun
            </h2>
            <p className="text-lg font-sans text-white opacity-90 mb-8 max-w-2xl mx-auto">
              İç mimarlık trendleri, tasarım ipuçları ve projelerimizle ilgili güncellemeleri e-posta ile alın.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white"
              />
              <Button type="submit" className="bg-[#c4975a] hover:bg-[#b8894d] text-white font-sans px-6">
                Abone Ol
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
