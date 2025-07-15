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
  "banyo-tasarimi": {
    title: "Banyo Tasarımı",
    location: "İzmir",
    image: "/images/banyo-tasarimi-1.png",
    fullDescription: `
      <p>Bu modern banyo tasarımı, estetik ve fonksiyonelliği bir araya getirerek ferah ve şık bir atmosfer sunuyor. Açık renk mermer desenli fayanslar, mekana aydınlık bir hava katarken, koyu mavi mermer desenli duvarlar derinlik ve lüks bir dokunuş sağlıyor.</p>
      <p>Özel tasarım lavabo ünitesi ve aydınlatmalı ayna, banyonun modern çizgisini tamamlarken, cam duşakabin alanı pratik bir kullanım sunuyor. Her detay, kullanıcı deneyimini en üst düzeye çıkarmak için özenle düşünüldü.</p>
      <p>Altın detaylı aydınlatma armatürleri ve minimalist aksesuarlar, banyonun genel estetiğine katkıda bulunarak zarif bir görünüm yaratıyor.</p>
    `,
    features: [
      "Modern ve minimalist tasarım",
      "Mermer desenli seramikler",
      "Özel tasarım lavabo ünitesi",
      "Aydınlatmalı ayna",
      "Cam duşakabin",
      "Altın detaylı aydınlatma",
    ],
    galleryImages: ["/images/banyo-tasarimi-1.png", "/images/banyo-tasarimi-2.png", "/images/banyo-tasarimi-3.png"],
  },
  "kafe-tasarimi": {
    title: "Kafe Tasarımı",
    location: "İstanbul",
    image: "/images/kafe-tasarimi-1.png",
    fullDescription: `
      <p>Bu kafe tasarımı, hem iç hem de dış mekanlarda sıcak ve davetkar bir atmosfer sunuyor. Pastel tonlar ve modern mobilyalarla şık bir buluşma noktası yaratıldı.</p>
      <p>Geniş cam cepheler sayesinde iç mekan doğal ışıkla dolarken, dışarıdaki oturma alanları açık havada keyifli vakit geçirme imkanı sunuyor. İç mekanda kemerli nişler ve özel aydınlatmalar, mekana özgün bir karakter katıyor.</p>
      <p>Özellikle tatlı teşhir alanı ve kahve barı, müşterilere görsel bir şölen sunarken, "Solstice Patisserie" neon tabelası modern ve genç bir dokunuş sağlıyor.</p>
    `,
    features: [
      "Pastel renk paleti ve modern mobilyalar",
      "Geniş cam cepheler ve doğal ışıklandırma",
      "Açık hava oturma alanı",
      "Özel tasarım kemerli nişler",
      "Neon tabela ve dekoratif aydınlatmalar",
      "Fonksiyonel teşhir ve servis alanları",
    ],
    galleryImages: ["/images/kafe-tasarimi-1.png", "/images/kafe-tasarimi-2.png"],
  },
  "kis-bahcesi-tasarimi": {
    title: "Kış Bahçesi Tasarımı",
    location: "Ankara",
    image: "/images/kis-bahcesi-tasarimi-1.png",
    fullDescription: `
      <p>Bu kış bahçesi tasarımı, iç mekan konforunu dış mekanın ferahlığıyla birleştiriyor. Geniş cam yüzeyler sayesinde doğal ışık içeri akarken, dışarıdaki manzara ile bütünleşen bir yaşam alanı sunuluyor.</p>
      <p>Doğal tonlarda seçilen mobilyalar ve hasır detaylar, mekana sıcak ve davetkar bir hava katıyor. Duvarlardaki modern sanat eserleri ve minimalist raflar, estetik bir dokunuş sağlıyor.</p>
      <p>Kış bahçesi, yılın her mevsimi keyifli vakit geçirmek için ideal bir ortam sunarken, dışarıdaki asılı salıncak gibi detaylar dinlenme ve huzur dolu anlar vadediyor.</p>
    `,
    features: [
      "Geniş cam cepheler ve doğal ışık",
      "Doğal tonlarda ve hasır detaylı mobilyalar",
      "Modern sanat eserleri ve minimalist dekorasyon",
      "İç ve dış mekan entegrasyonu",
      "Yıl boyu kullanılabilir yaşam alanı",
      "Rahatlatıcı atmosfer ve dinlenme köşeleri",
    ],
    galleryImages: ["/images/kis-bahcesi-tasarimi-1.png", "/images/kis-bahcesi-tasarimi-2.png"],
  },
  "konut-tasarimi-polonya": {
    title: "Konut Tasarımı Polonya",
    location: "Polonya",
    image: "/images/konut-tasarimi-polonya-4.png", // Ana görsel olarak mutfak/oturma alanı
    fullDescription: `
      <p>Polonya'daki bu konut projesi, modern yaşamın gerektirdiği fonksiyonellik ile estetik zarafeti bir araya getiriyor. Açık plan mutfak ve oturma alanı, ferah ve davetkar bir atmosfer yaratırken, doğal ahşap tonları ve pastel renk paleti mekana sıcaklık katıyor.</p>
      <p>Şömine detayı, oturma alanına sıcak bir odak noktası sağlarken, yemek odasındaki altın detaylı aydınlatma ve sandalyeler lüks bir dokunuş sunuyor. Her bir alan, detaylara verilen önemle ve kullanıcı konforu düşünülerek tasarlandı.</p>
      <p>Minimalist raf sistemleri ve özenle seçilmiş sanat eserleri, mekanın genel estetiğini tamamlarken, geniş pencereler doğal ışık alımını maksimize ediyor.</p>
    `,
    features: [
      "Açık plan mutfak ve oturma alanı",
      "Modern şömine detayı",
      "Altın detaylı yemek odası mobilyaları ve aydınlatma",
      "Doğal ahşap ve pastel renk paleti",
      "Minimalist dekorasyon ve sanat eserleri",
      "Geniş pencereler ve doğal ışıklandırma",
    ],
    galleryImages: [
      "/images/konut-tasarimi-polonya-4.png",
      "/images/konut-tasarimi-polonya-5.png",
      "/images/konut-tasarimi-polonya-6.png",
      "/images/konut-tasarimi-polonya-8.png",
      "/images/konut-tasarimi-polonya-1.png",
      "/images/konut-tasarimi-polonya-2.png",
      "/images/konut-tasarimi-polonya-3.png",
      "/images/konut-tasarimi-polonya-7.png",
    ],
  },
  "salon-tasarimi": {
    title: "Salon Tasarımı",
    location: "İzmir",
    image: "/images/salon-tasarimi-1.png",
    fullDescription: `
      <p>Bu salon tasarımı, modern çizgileri ve sıcak renk paletini birleştirerek davetkar ve şık bir yaşam alanı sunuyor. Bej tonlarındaki rahat kanepeler, ahşap orta sehpa ile doğal bir uyum yakalıyor.</p>
      <p>Duvarlardaki dekoratif paneller ve minimalist TV ünitesi, mekana sofistike bir dokunuş katarken, özenle seçilmiş sanat eserleri ve aksesuarlar kişisel bir atmosfer yaratıyor. Aydınlatma, mekanın genel ambiyansını destekleyecek şekilde tasarlandı.</p>
      <p>Bu salon, hem günlük kullanım hem de misafir ağırlama için ideal, konforlu ve estetik bir ortam sunmaktadır.</p>
    `,
    features: [
      "Modern ve sıcak renk paleti",
      "Rahat bej kanepeler",
      "Ahşap orta sehpa",
      "Dekoratif duvar panelleri ve TV ünitesi",
      "Minimalist sanat eserleri ve aksesuarlar",
      "Fonksiyonel aydınlatma",
    ],
    galleryImages: ["/images/salon-tasarimi-1.png", "/images/salon-tasarimi-2.png"],
  },
  "yatak-odasi-tasarimi": {
    title: "Yatak Odası Tasarımı",
    location: "İzmir",
    image: "/images/yatak-odasi-tasarimi-3.png", // Ana görsel olarak genel görünüm
    fullDescription: `
      <p>Bu yatak odası tasarımı, modern ve huzurlu bir atmosfer sunarak dinlenmek için ideal bir ortam yaratıyor. Kiremit rengi vurgu duvarı, odaya sıcaklık ve derinlik katarken, gri tonlarındaki yatak başlığı ve yatak örtüsüyle uyumlu bir kontrast oluşturuyor.</p>
      <p>Odanın bir köşesinde yer alan şık TV ünitesi ve makyaj masası, fonksiyonelliği artırırken, yuvarlak ayna ve minimalist aksesuarlar estetik bir dokunuş sağlıyor. Geniş pencereler, doğal ışığın içeri girmesine olanak tanıyarak ferah bir his veriyor.</p>
      <p>Ahşap zemin ve açık renkli halı, odanın genel sıcaklığını tamamlarken, raf ünitesi kişisel eşyalar için pratik depolama alanı sunuyor. Bu tasarım, hem konforlu bir uyku alanı hem de kişisel bir yaşam alanı sunmayı hedefliyor.</p>
    `,
    features: [
      "Kiremit rengi vurgu duvarı",
      "Modern ve minimalist yatak başlığı",
      "Fonksiyonel TV ünitesi ve makyaj masası",
      "Yuvarlak dekoratif ayna",
      "Doğal ahşap zemin ve açık renkli halı",
      "Entegre raf ünitesi ve depolama çözümleri",
    ],
    galleryImages: [
      "/images/yatak-odasi-tasarimi-3.png",
      "/images/yatak-odasi-tasarimi-1.png",
      "/images/yatak-odasi-tasarimi-2.png",
      "/images/yatak-odasi-tasarimi-4.png",
    ],
  },
}
