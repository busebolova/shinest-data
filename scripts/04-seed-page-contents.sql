-- Ana sayfa içeriklerini ekle
INSERT INTO page_contents (page_slug, section_key, content_type, content) VALUES 
-- Hero Section
('home', 'hero_title', 'TEXT', '{"tr": "SHINEST", "en": "SHINEST"}'),
('home', 'hero_subtitle', 'TEXT', '{"tr": "İÇ MİMARLIK", "en": "INTERIOR ARCHITECTURE"}'),
('home', 'hero_image', 'IMAGE', '{"url": "/images/hero-image.png", "alt": {"tr": "Lüks İç Mimarlık", "en": "Luxury Interior Architecture"}}'),

-- Text Section
('home', 'text_main1', 'TEXT', '{"tr": "MEKANLARINIZ", "en": "YOUR SPACES"}'),
('home', 'text_main2', 'TEXT', '{"tr": "YAŞAMINIZA", "en": "BRING LIGHT TO"}'),
('home', 'text_handwriting', 'TEXT', '{"tr": "ışık tutar!", "en": "your life!"}'),
('home', 'text_description', 'RICH_TEXT', '{"tr": "SHINEST İç Mimarlık, tam kapsamlı lüks iç mekan tasarım hizmetleri sunar — ilk konsept ve estetik danışmanlıktan koordinasyon, uygulama ve dergiye layık son dokunuşlara kadar.", "en": "SHINEST Interior Architecture offers comprehensive luxury interior design services — from initial concept and aesthetic consultation to coordination, implementation and magazine-worthy finishing touches."}'),

-- Gallery Images
('home', 'gallery_images', 'GALLERY', '{"images": [
    {"url": "/images/gallery-1.png", "alt": {"tr": "Modern Villa", "en": "Modern Villa"}},
    {"url": "/images/gallery-2.png", "alt": {"tr": "Ahşap Detaylar", "en": "Wooden Details"}},
    {"url": "/images/gallery-3.png", "alt": {"tr": "Minimal Banyo", "en": "Minimal Bathroom"}},
    {"url": "/images/gallery-4.png", "alt": {"tr": "Mutfak Tasarımı", "en": "Kitchen Design"}},
    {"url": "/images/gallery-5.png", "alt": {"tr": "Yaşam Alanı", "en": "Living Space"}}
]}'),

-- Second Gallery
('home', 'second_gallery', 'GALLERY', '{"images": [
    {"url": "/images/second-gallery-1.png", "alt": {"tr": "Tasarım Danışmanlığı", "en": "Design Consultation"}},
    {"url": "/images/second-gallery-2.png", "alt": {"tr": "Proje Uygulaması", "en": "Project Implementation"}}
]}'),

-- About Info Section
('home', 'about_description', 'RICH_TEXT', '{"tr": "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her projede özgün tasarım anlayışımızla, işlevsellik ve estetiği mükemmel bir uyumda birleştirerek, sizin hikayenizi mekanlarınızda yaşatıyoruz. Hayallerinizden gerçeğe uzanan bu yolculukta, her detay özenle tasarlanır.", "en": "We transform your living spaces into works of art. In every project, with our unique design approach, we combine functionality and aesthetics in perfect harmony, bringing your story to life in your spaces."}'),

-- About Page
('about', 'about_title', 'TEXT', '{"tr": "Hakkımızda", "en": "About Us"}'),
('about', 'about_content', 'RICH_TEXT', '{"tr": "Shinest İç Mimarlık olarak yenilikçi ve fonksiyonel iç mekan çözümleri sunarak, danışanlarımızın yaşam alanlarınıza değer katmayı hedefleyen bir tasarım firmasıyız.", "en": "As Shinest Interior Architecture, we are a design firm that aims to add value to our clients living spaces by offering innovative and functional interior solutions."}'),
('about', 'about_image', 'IMAGE', '{"url": "https://plus.unsplash.com/premium_photo-1671269943771-63db2ab54bf2?q=80&w=2574&auto=format&fit=crop", "alt": {"tr": "SHINEST Studio", "en": "SHINEST Studio"}}'),

-- Services Page
('services', 'services_title', 'TEXT', '{"tr": "Hizmetlerimiz", "en": "Our Services"}'),
('services', 'services_description', 'RICH_TEXT', '{"tr": "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.", "en": "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers."}')

ON CONFLICT (page_slug, section_key) DO NOTHING;
