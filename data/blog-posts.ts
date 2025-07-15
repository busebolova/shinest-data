import type { StaticImageData } from "next/image"

interface BlogPostDetail {
  title: string
  date: string
  image: string | StaticImageData
  fullContent: string
}

export const blogPostsData: Record<string, BlogPostDetail> = {
  "ic-mimaride-2024-trendleri": {
    title: "İç Mimaride 2024 Trendleri",
    date: "15 Mayıs 2024",
    image: "/placeholder.svg?height=600&width=800",
    fullContent: `
      <p>2024 yılı, iç mimaride sürdürülebilirlik, doğallık ve kişiselleştirilmiş mekanların ön planda olduğu bir yıl olacak. Minimalist yaklaşımlar devam ederken, sıcak tonlar ve dokulu yüzeyler mekanlara derinlik katacak.</p>
      <p>Doğal malzemelerin kullanımı, özellikle ahşap, taş ve keten gibi dokular, iç mekanlara huzurlu ve organik bir hava katacak. Büyük pencereler ve doğal ışıklandırma, mekanların ferahlığını artırırken, bitki kullanımı da iç mekanlara canlılık getirecek.</p>
      <p>Akıllı ev teknolojileri, konforu ve işlevselliği artırarak yaşam alanlarını daha pratik hale getirecek. Kişisel zevkleri yansıtan sanat eserleri ve el yapımı objeler, mekanlara özgün bir karakter kazandıracak.</p>
      <p>Renk paletinde toprak tonları, bejler, sıcak griler ve pastel yeşiller öne çıkacak. Bu renkler, sakin ve davetkar bir atmosfer yaratmak için ideal olacak.</p>
      <p>Özetle, 2024 iç mimari trendleri, doğayla iç içe, fonksiyonel ve kişisel dokunuşlarla zenginleştirilmiş yaşam alanlarına odaklanıyor.</p>
    `,
  },
  "kucuk-mekanlari-buyuk-gosterme-sanati": {
    title: "Küçük Mekanları Büyük Gösterme Sanatı",
    date: "28 Nisan 2024",
    image: "/placeholder.svg?height=600&width=800",
    fullContent: `
      <p>Küçük mekanları daha geniş ve ferah göstermek, doğru tasarım stratejileriyle mümkündür. İşte size birkaç ipucu:</p>
      <p><strong>Açık Renkler Kullanın:</strong> Duvarlarda, mobilyalarda ve büyük yüzeylerde açık renkler tercih edin. Beyaz, krem, açık gri gibi tonlar ışığı yansıtarak mekanı daha büyük gösterir.</p>
      <p><strong>Aynaların Gücü:</strong> Aynalar, mekanı iki katına çıkarır ve derinlik hissi yaratır. Büyük bir ayna veya aynalı mobilyalar kullanarak bu etkiyi güçlendirebilirsiniz.</p>
      <p><strong>Çok Fonksiyonlu Mobilyalar:</strong> Depolama alanı sunan puflar, açılır kapanır masalar veya yataklı kanepeler gibi çok amaçlı mobilyalar, küçük alanlarda yerden tasarruf etmenizi sağlar.</p>
      <p><strong>Dikey Alanı Kullanın:</strong> Duvar rafları, yüksek kitaplıklar veya dikey depolama çözümleri ile zemini boş bırakarak mekanı daha geniş gösterebilirsiniz.</p>
      <p><strong>Doğal Işığı Maksimize Edin:</strong> Perdeleri açık tutun, kalın perdeler yerine tül veya ince kumaşlar tercih edin. Doğal ışık, mekanın daha aydınlık ve ferah görünmesini sağlar.</p>
      <p><strong>Minimalist Yaklaşım:</strong> Az eşya, ferah bir görünüm demektir. Gereksiz eşyalardan kurtulun ve sadece ihtiyacınız olanları ve sevdiğiniz dekoratif objeleri kullanın.</p>
      <p>Bu ipuçlarıyla küçük mekanlarınızı daha işlevsel ve estetik hale getirebilirsiniz.</p>
    `,
  },
  "surdurulebilir-ic-mimari-cozumler": {
    title: "Sürdürülebilir İç Mimari Çözümler",
    date: "10 Nisan 2024",
    image: "/placeholder.svg?height=600&width=800",
    fullContent: `
      <p>Sürdürülebilir iç mimari, çevreye duyarlı malzemelerin kullanımı, enerji verimliliği ve sağlıklı yaşam alanları yaratma prensiplerine dayanır. İşte sürdürülebilir iç mimaride öne çıkan çözümler:</p>
      <p><strong>Doğal ve Geri Dönüştürülmüş Malzemeler:</strong> Bambu, mantar, geri dönüştürülmüş ahşap, cam ve metal gibi malzemeler tercih edilmelidir. Bu malzemeler hem estetik hem de çevre dostudur.</p>
      <p><strong>Enerji Verimliliği:</strong> LED aydınlatmalar, enerji verimli pencereler ve iyi yalıtım, enerji tüketimini azaltır. Güneş enerjisi gibi yenilenebilir enerji kaynaklarının entegrasyonu da önemlidir.</p>
      <p><strong>Su Tasarrufu:</strong> Düşük akışlı musluklar, duş başlıkları ve verimli tuvalet sistemleri su tüketimini azaltmaya yardımcı olur. Gri su geri dönüşüm sistemleri de düşünülebilir.</p>
      <p><strong>İç Hava Kalitesi:</strong> VOC (uçucu organik bileşik) içermeyen boyalar, yapıştırıcılar ve mobilyalar kullanarak iç hava kalitesini artırın. Bitkiler de doğal hava temizleyicileridir.</p>
      <p><strong>Dayanıklılık ve Uzun Ömürlülük:</strong> Kaliteli ve dayanıklı ürünler seçmek, sık sık değiştirme ihtiyacını ortadan kaldırarak atık miktarını azaltır.</p>
      <p><strong>Yerel Üretim:</strong> Yerel olarak üretilen malzemeleri ve ürünleri tercih etmek, nakliye kaynaklı karbon ayak izini azaltır ve yerel ekonomiyi destekler.</p>
      <p>Sürdürülebilir iç mimari, hem gezegenimiz hem de sağlığımız için daha iyi yaşam alanları yaratmanın anahtarıdır.</p>
    `,
  },
}
