"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Banyo Tasarımı",
    location: "Türkiye",
    slug: "banyo-tasarimi",
    category: "Banyo Tasarımı",
    year: "2024",
    client: "Özel Müşteri",
    area: "15 m²",
    duration: "3 Hafta",
    description:
      "Modern ve minimalist banyo tasarımı projemizde, petrol yeşili dolap rengi ile altın detayların uyumu öne çıkmaktadır. Beyaz mermer tezgah ve oval ayna ile lüks bir atmosfer yaratılmıştır. LED aydınlatma sistemi ile hem fonksiyonel hem de estetik bir çözüm sunulmuştur. Mavi mermer duvar kaplaması ve cam duş kabini ile ferah bir alan oluşturulmuştur.",
    features: [
      "Petrol yeşili özel renk dolap",
      "Beyaz mermer tezgah",
      "Altın rengi armatürler",
      "LED aydınlatma sistemi",
      "Oval tasarım ayna",
      "Mavi mermer duvar kaplaması",
      "Cam duş kabini",
      "Minimalist tasarım anlayışı",
    ],
    images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png", "/images/bathroom-design-3.png"],
  },
  {
    id: 2,
    title: "Kafe Tasarımı",
    location: "Türkiye",
    slug: "kafe-tasarimi",
    category: "Kafe Tasarımı",
    year: "2024",
    client: "Kafe Müşterisi",
    area: "85 m²",
    duration: "6 Hafta",
    description:
      "Modern patisserie tasarımı projemizde, yeşil fluted (oluklu) tezgah tasarımı ile sıcak ve davetkar bir atmosfer yaratılmıştır. Beyaz asma lambalar ve şık vitrin dolabı ile tatlıların sergilendiği özel alan tasarlanmıştır. Terracotta rengi duvar kaplaması ile doğal ve samimi bir hava elde edilmiştir. Pembe kadife koltuklar ve beyaz yuvarlak masalar ile konforlu oturma alanı oluşturulmuştur.",
    features: [
      "Yeşil fluted tezgah tasarımı",
      "Beyaz asma lambalar",
      "Özel vitrin dolabı",
      "Terracotta duvar kaplaması",
      "LED gizli aydınlatma",
      "Modern sergileme alanları",
      "Pembe kadife koltuklar",
      "Büyük cam pencereler",
    ],
    images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
  },
  {
    id: 3,
    title: "Kış Bahçesi Tasarımı",
    location: "Türkiye",
    slug: "kis-bahcesi-tasarimi",
    category: "Kış Bahçesi Tasarımı",
    year: "2024",
    client: "Özel Müşteri",
    area: "45 m²",
    duration: "4 Hafta",
    description:
      "Modern cam kış bahçesi tasarımı projemizde, beyaz çerçeveli büyük cam paneller ile doğal ışığın maksimize edildiği, dört mevsim kullanılabilen yaşam alanı oluşturulmuştur. Ahşap deck zemin ve modern mobilyalar ile konforlu bir dış mekan deneyimi sunulmaktadır. Gri koltuk takımı ve modern dekorasyon ile konforlu iç mekan tasarlanmıştır. Cam yapının şeffaflığı sayesinde iç ve dış mekan arasında kusursuz bir geçiş sağlanmıştır.",
    features: [
      "Büyük cam panel sistemi",
      "Beyaz çerçeveli modern yapı",
      "Ahşap deck zemin",
      "Dört mevsim kullanım",
      "Maksimum doğal ışık",
      "Gri L şeklinde koltuk takımı",
      "Dekoratif aksesuar düzenlemesi",
      "İç-dış mekan uyumu",
    ],
    images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
  },
  {
    id: 4,
    title: "Polonya Konut Tasarımı",
    location: "Polonya",
    slug: "polonya-konut-tasarimi",
    category: "Konut Tasarımı",
    year: "2024",
    client: "Özel Müşteri",
    area: "120 m²",
    duration: "8 Hafta",
    description:
      "Modern Polonya dairesi tasarımı projemizde, açık plan yaşam alanı ile gri-beyaz renk paleti ve altın detaylar kullanılmıştır. Yemek odasında büyük beyaz masa ve gri sandalyeler ile şık bir yemek alanı oluşturulmuştur. Oturma odasında gri modüler koltuk takımı ve modern TV ünitesi ile konforlu yaşam alanı tasarlanmıştır. Mutfakta L şeklinde düzenleme ile maksimum fonksiyonellik sağlanmış, gri alt dolap ve beyaz üst dolap kombinasyonu ile modern görünüm elde edilmiştir. Modern şömine ile sıcak ve davetkar bir atmosfer yaratılmıştır.",
    features: [
      "Açık plan yaşam alanı",
      "Büyük beyaz yemek masası",
      "Gri kadife sandalyeler",
      "Altın rengi detaylar",
      "Modern moleküler avize",
      "Gri modüler koltuk takımı",
      "L şeklinde mutfak düzeni",
      "Modern köşe şömine",
      "Mermer zemin kaplaması",
      "İki renkli dolap sistemi",
    ],
    images: [
      "/images/poland-apartment-1.png",
      "/images/poland-apartment-2.png",
      "/images/poland-apartment-3.png",
      "/images/poland-apartment-4.png",
      "/images/poland-apartment-5.png",
      "/images/poland-apartment-6.png",
      "/images/poland-apartment-7.png",
      "/images/poland-apartment-8.png",
      "/images/poland-apartment-9.png",
      "/images/poland-apartment-10.png",
    ],
  },
  {
    id: 5,
    title: "Modern Salon Tasarımı",
    location: "Türkiye",
    slug: "modern-salon-tasarimi",
    category: "Salon Tasarımı",
    year: "2024",
    client: "Özel Müşteri",
    area: "35 m²",
    duration: "4 Hafta",
    description:
      "Modern salon tasarımı projemizde, nötr renk paleti ve minimalist detaylar ile şık ve konforlu bir yaşam alanı oluşturulmuştur. Krem rengi L şeklinde koltuk takımı ile ferah bir oturma alanı tasarlanmıştır. Koyu gri aksan duvarı üzerinde beyaz çerçeve detayları ile modern bir TV ünitesi yaratılmıştır. Yuvarlak ahşap orta sehpa ve dekoratif vazolar ile sıcak bir atmosfer elde edilmiştir. Minimalist aydınlatma ve duvar sanatı ile estetik bir görünüm sağlanmıştır.",
    features: [
      "Krem rengi L şeklinde koltuk takımı",
      "Koyu gri aksan duvarı",
      "Beyaz çerçeve detayları",
      "Yuvarlak ahşap orta sehpa",
      "Minimalist aydınlatma",
      "Duvar sanatı",
      "Beyaz TV ünitesi",
      "Dekoratif vazolar ve bitkiler",
    ],
    images: ["/images/living-room-design-1.png", "/images/living-room-design-2.png"],
  },
  {
    id: 6,
    title: "Modern Yatak Odası Tasarımı",
    location: "Türkiye",
    slug: "modern-yatak-odasi-tasarimi",
    category: "Yatak Odası Tasarımı",
    year: "2024",
    client: "Özel Müşteri",
    area: "25 m²",
    duration: "3 Hafta",
    description:
      "Modern yatak odası tasarımı projemizde, sıcak kahverengi aksan duvarı ve nötr renk paleti ile huzurlu bir uyku alanı oluşturulmuştur. Beyaz fluted (oluklu) TV ünitesi ve çalışma masası ile fonksiyonel bir alan tasarlanmıştır. Yuvarlak duvar aynası ve ahşap tavan detayları ile şık bir görünüm elde edilmiştir. Katmanlı yastıklar ve gri yatak örtüsü ile konforlu bir yatak düzeni yaratılmıştır. Beyaz kitaplık ünitesi ile depolama alanı sağlanmış, kahverengi perdeler ile sıcak bir atmosfer oluşturulmuştur.",
    features: [
      "Kahverengi aksan duvarı",
      "Beyaz fluted TV ünitesi",
      "Yuvarlak duvar aynası",
      "Ahşap tavan detayları",
      "Katmanlı yatak düzeni",
      "Beyaz kitaplık ünitesi",
      "Kahverengi perdeler",
      "Gri-bej renk paleti",
      "Modern aydınlatma sistemi",
      "Ahşap zemin",
    ],
    images: [
      "/images/bedroom-design-1.png",
      "/images/bedroom-design-2.png",
      "/images/bedroom-design-3.png",
      "/images/bedroom-design-4.png",
    ],
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const project = projects.find((p) => p.slug === params.slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoaded(false)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-shinest-blue mb-4">Proje Bulunamadı</h1>
          <Link href="/projects" className="text-[#c4975a] hover:underline">
            Projelere Geri Dön
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Geri Dön Butonu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#c4975a] hover:text-shinest-blue transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span className="font-sans">Projelere Geri Dön</span>
            </Link>
          </motion.div>

          {/* Proje Başlığı */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-shinest-blue mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-[#2a2a2a]/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="font-sans text-sm">{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="font-sans text-sm">{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span className="font-sans text-sm">{project.category}</span>
              </div>
            </div>
          </motion.div>

          {/* Ana Görsel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src={project.images[currentImageIndex] || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Görsel Navigasyonu */}
            {project.images.length > 1 && (
              <div className="flex gap-4 mt-6 justify-center flex-wrap">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      currentImageIndex === index ? "ring-2 ring-[#c4975a] scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Proje Bilgileri */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="font-display text-xl text-shinest-blue mb-6">Proje Detayları</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-sans text-sm text-[#2a2a2a]/70 block">Müşteri</span>
                    <span className="font-sans text-base text-[#2a2a2a]">{project.client}</span>
                  </div>
                  <div>
                    <span className="font-sans text-sm text-[#2a2a2a]/70 block">Alan</span>
                    <span className="font-sans text-base text-[#2a2a2a]">{project.area}</span>
                  </div>
                  <div>
                    <span className="font-sans text-sm text-[#2a2a2a]/70 block">Süre</span>
                    <span className="font-sans text-base text-[#2a2a2a]">{project.duration}</span>
                  </div>
                  <div>
                    <span className="font-sans text-sm text-[#2a2a2a]/70 block">Kategori</span>
                    <span className="font-sans text-base text-[#2a2a2a]">{project.category}</span>
                  </div>
                </div>

                {/* Özellikler */}
                <h4 className="font-display text-lg text-shinest-blue mt-8 mb-4">Özellikler</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#c4975a] mt-1">•</span>
                      <span className="font-sans text-sm text-[#2a2a2a]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Proje Açıklaması */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-2"
            >
              <h3 className="font-display text-2xl text-shinest-blue mb-6">Proje Hakkında</h3>
              <div className="prose prose-lg max-w-none">
                <p className="font-sans text-[#2a2a2a] leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* İletişim Butonu */}
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#c4975a] text-white px-8 py-4 rounded-lg hover:bg-[#b8875a] transition-colors duration-300 font-sans"
                >
                  Benzer Bir Proje İçin İletişime Geçin
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
