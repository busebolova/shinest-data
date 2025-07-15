import type { StaticImageData } from "next/image"

interface ProjectDetail {
  title: string
  location: string
  image: string | StaticImageData
  fullDescription: string
  features: string[]
  galleryImages: (string | StaticImageData)[]
}

export const projectsData: Record<string, ProjectDetail> = {
  "modern-villa": {
    title: "Modern Villa",
    location: "İstanbul",
    image: "/images/project-kitchen.png",
    fullDescription: `
      <p>Bu modern villa projesi, İstanbul'un kalbinde lüks ve konforu bir araya getiriyor. Geniş yaşam alanları, doğal ışıkla dolu odalar ve minimalist tasarım anlayışı ile dikkat çekiyor.</p>
      <p>Projede kullanılan yüksek kaliteli malzemeler ve akıllı ev sistemleri, sakinlerine modern bir yaşam deneyimi sunuyor. Her detay, estetik ve fonksiyonelliği birleştirecek şekilde özenle seçildi.</p>
      <p>Özellikle geniş pencereler, şehrin nefes kesen manzarasını içeri taşırken, özel tasarım mobilyalar ve sanat eserleri mekanlara karakter katıyor.</p>
    `,
    features: [
      "Akıllı ev sistemleri entegrasyonu",
      "Özel tasarım mobilyalar",
      "Panoramik şehir manzarası",
      "Yüksek tavanlar ve geniş cam yüzeyler",
      "Sürdürülebilir malzeme kullanımı",
    ],
    galleryImages: [
      "/images/project-kitchen.png",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  "wooden-details": {
    title: "Wooden Details",
    location: "Bodrum",
    image: "/images/project-patio.png",
    fullDescription: `
      <p>Bodrum'da yer alan bu proje, doğal ahşap detayları ve modern mimariyi harmanlayarak sıcak ve davetkar bir atmosfer yaratıyor. Ege'nin doğal güzellikleriyle uyumlu bir yaşam alanı sunuyor.</p>
      <p>Ahşabın sıcaklığı, taşın sağlamlığı ve camın şeffaflığı bir araya gelerek eşsiz bir denge oluşturuyor. Açık plan yaşam alanları, iç ve dış mekan arasındaki sınırı ortadan kaldırıyor.</p>
      <p>Özellikle geniş teraslar ve özel peyzajlı bahçeler, Akdeniz yaşam tarzını en iyi şekilde deneyimleme fırsatı sunuyor.</p>
    `,
    features: [
      "Doğal ahşap ve taş kullanımı",
      "Geniş teras ve bahçe alanları",
      "Açık plan yaşam konsepti",
      "Deniz manzaralı odalar",
      "Özel tasarım aydınlatma",
    ],
    galleryImages: [
      "/images/project-patio.png",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  "boutique-hotel": {
    title: "Boutique Hotel",
    location: "Paris",
    image: "https://aebeleinteriors.com/wp-content/uploads/2020/09/aebele-hero-2-800x1158.webp",
    fullDescription: `
      <p>Paris'in kalbinde yer alan bu butik otel projesi, klasik Fransız zarafetini modern dokunuşlarla birleştiriyor. Her oda, misafirlerine unutulmaz bir konaklama deneyimi sunmak üzere tasarlandı.</p>
      <p>Otel lobisinden odalara kadar her alanda, lüks kumaşlar, özel yapım mobilyalar ve sanatsal detaylar kullanıldı. Paris'in ruhunu yansıtan bir atmosfer yaratıldı.</p>
      <p>Özellikle otelin restoran ve bar alanları, hem yerel halk hem de turistler için popüler bir buluşma noktası haline geldi.</p>
    `,
    features: [
      "Fransız klasik ve modern stil harmanı",
      "Özel tasarım mobilyalar ve sanat eserleri",
      "Şehir merkezine yakın konum",
      "Lüks banyo ve yatak odası tasarımları",
      "Özel aydınlatma senaryoları",
    ],
    galleryImages: [
      "https://aebeleinteriors.com/wp-content/uploads/2020/09/aebele-hero-2-800x1158.webp",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  // Add more projects here as needed
}
