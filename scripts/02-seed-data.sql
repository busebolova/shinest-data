-- Temel verileri ekle

-- İlk admin kullanıcısı (GitHub ile giriş yapacak)
INSERT INTO users (email, name, role) VALUES 
('admin@shinest.com', 'SHINEST Admin', 'SUPER_ADMIN')
ON CONFLICT (email) DO NOTHING;

-- Site ayarları
INSERT INTO site_settings (key, value, type, description, is_public) VALUES 
('site_title', '{"tr": "SHINEST İç Mimarlık", "en": "SHINEST Interior Architecture"}', 'TEXT', 'Site başlığı', true),
('site_description', '{"tr": "Lüks iç mimarlık ve tasarım hizmetleri", "en": "Luxury interior architecture and design services"}', 'TEXT', 'Site açıklaması', true),
('contact_email', '"iletisim@shinesticmimarlik.com"', 'TEXT', 'İletişim e-postası', true),
('contact_phone', '"0 552 179 87 35"', 'TEXT', 'İletişim telefonu', true),
('contact_address', '{"tr": "İzmir, Türkiye", "en": "Izmir, Turkey"}', 'TEXT', 'Adres', true),
('social_instagram', '"https://www.instagram.com/icm.selin"', 'TEXT', 'Instagram URL', true),
('social_youtube', '"https://www.youtube.com/@ShinestIcMimarlikk"', 'TEXT', 'YouTube URL', true),
('social_linkedin', '"https://www.linkedin.com/company/shinesticmimarlik"', 'TEXT', 'LinkedIn URL', true)
ON CONFLICT (key) DO NOTHING;

-- Ana sayfa içerik blokları
INSERT INTO content_blocks (key, type, content, created_by) VALUES 
('hero_title', 'TEXT', '{"tr": "SHINEST", "en": "SHINEST"}', (SELECT id FROM users WHERE email = 'admin@shinest.com')),
('hero_subtitle', 'TEXT', '{"tr": "İÇ MİMARLIK", "en": "INTERIOR ARCHITECTURE"}', (SELECT id FROM users WHERE email = 'admin@shinest.com')),
('text_main1', 'TEXT', '{"tr": "MEKANLARINIZ", "en": "YOUR SPACES"}', (SELECT id FROM users WHERE email = 'admin@shinest.com')),
('text_main2', 'TEXT', '{"tr": "YAŞAMINIZA", "en": "BRING LIGHT TO"}', (SELECT id FROM users WHERE email = 'admin@shinest.com')),
('text_handwriting', 'TEXT', '{"tr": "ışık tutar!", "en": "your life!"}', (SELECT id FROM users WHERE email = 'admin@shinest.com')),
('text_description', 'RICH_TEXT', '{"tr": "SHINEST İç Mimarlık, tam kapsamlı lüks iç mekan tasarım hizmetleri sunar — ilk konsept ve estetik danışmanlıktan koordinasyon, uygulama ve dergiye layık son dokunuşlara kadar.", "en": "SHINEST Interior Architecture offers comprehensive luxury interior design services — from initial concept and aesthetic consultation to coordination, implementation and magazine-worthy finishing touches."}', (SELECT id FROM users WHERE email = 'admin@shinest.com')),
('about_description', 'RICH_TEXT', '{"tr": "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her projede özgün tasarım anlayışımızla, işlevsellik ve estetiği mükemmel bir uyumda birleştirerek, sizin hikayenizi mekanlarınızda yaşatıyoruz.", "en": "We transform your living spaces into works of art. In every project, with our unique design approach, we combine functionality and aesthetics in perfect harmony, bringing your story to life in your spaces."}', (SELECT id FROM users WHERE email = 'admin@shinest.com'))
ON CONFLICT (key) DO NOTHING;

-- Hizmetler
INSERT INTO services (slug, title, description, full_description, features, process, is_active, order_index) VALUES 
('consulting', 
 '{"tr": "Danışmanlık / Online Danışmanlık", "en": "Consulting / Online Consulting"}',
 '{"tr": "Uzaktan ve yüz yüze profesyonel iç mimarlık danışmanlığı hizmetleri.", "en": "Remote and face-to-face professional interior architecture consulting services."}',
 '{"tr": "SHINEST İç Mimarlık olarak, uzaktan ve yüz yüze profesyonel iç mimarlık danışmanlığı hizmetleri sunuyoruz. Mekanınızın potansiyelini keşfetmek için uzman görüşü alın.", "en": "As SHINEST Interior Architecture, we offer remote and face-to-face professional interior architecture consulting services. Get expert opinion to discover your space''s potential."}',
 '{"tr": ["Mekan analizi ve değerlendirme", "Konsept danışmanlığı", "Renk ve malzeme danışmanlığı", "Mobilya ve aksesuar önerileri", "Online video konferans ile uzaktan danışmanlık", "Detaylı rapor ve öneriler"], "en": ["Space analysis and evaluation", "Concept consulting", "Color and material consulting", "Furniture and accessory recommendations", "Remote consulting via online video conference", "Detailed reports and recommendations"]}',
 '{"tr": [{"title": "İlk Görüşme", "description": "İhtiyaçlarınızı ve beklentilerinizi anlamak için detaylı bir görüşme yaparız."}, {"title": "Mekan Analizi", "description": "Mekanınızın mevcut durumunu değerlendirir, potansiyelini ve kısıtlamalarını belirleriz."}, {"title": "Konsept Önerileri", "description": "İhtiyaçlarınıza ve beğenilerinize uygun konsept önerileri sunarız."}, {"title": "Detaylı Rapor", "description": "Tüm önerilerimizi ve değerlendirmelerimizi içeren detaylı bir rapor hazırlarız."}], "en": [{"title": "Initial Meeting", "description": "We conduct a detailed meeting to understand your needs and expectations."}, {"title": "Space Analysis", "description": "We evaluate the current state of your space and determine its potential and limitations."}, {"title": "Concept Proposals", "description": "We offer concept proposals suitable for your needs and preferences."}, {"title": "Detailed Report", "description": "We prepare a detailed report containing all our recommendations and evaluations."}]}',
 true, 1),

('design', 
 '{"tr": "Tasarım", "en": "Design"}',
 '{"tr": "Yaratıcı ve işlevsel iç mekan tasarım çözümleri.", "en": "Creative and functional interior design solutions."}',
 '{"tr": "SHINEST İç Mimarlık olarak, yaratıcı ve işlevsel iç mekan tasarım çözümleri sunuyoruz. Konsept geliştirmeden 3D görselleştirmeye kadar kapsamlı tasarım hizmetleri veriyoruz.", "en": "As SHINEST Interior Architecture, we offer creative and functional interior design solutions. We provide comprehensive design services from concept development to 3D visualization."}',
 '{"tr": ["Konsept tasarım", "Mekan planlama", "3D görselleştirme", "Malzeme ve renk seçimi", "Mobilya ve aksesuar seçimi", "Aydınlatma tasarımı"], "en": ["Concept design", "Space planning", "3D visualization", "Material and color selection", "Furniture and accessory selection", "Lighting design"]}',
 '{"tr": [{"title": "Konsept Geliştirme", "description": "İhtiyaçlarınız ve beğenileriniz doğrultusunda özgün konseptler geliştiririz."}, {"title": "Mekan Planlama", "description": "Mekanınızın en verimli şekilde kullanılması için detaylı planlar hazırlarız."}, {"title": "3D Görselleştirme", "description": "Tasarımınızı hayata geçirmeden önce nasıl görüneceğini görebilmeniz için 3D görseller hazırlarız."}, {"title": "Detaylı Çizimler", "description": "Uygulama aşamasında kullanılacak detaylı teknik çizimler hazırlarız."}], "en": [{"title": "Concept Development", "description": "We develop unique concepts in line with your needs and preferences."}, {"title": "Space Planning", "description": "We prepare detailed plans for the most efficient use of your space."}, {"title": "3D Visualization", "description": "We prepare 3D visuals so you can see how your design will look before implementation."}, {"title": "Detailed Drawings", "description": "We prepare detailed technical drawings to be used in the implementation phase."}]}',
 true, 2),

('implementation', 
 '{"tr": "Uygulama", "en": "Implementation"}',
 '{"tr": "Tasarımdan gerçeğe dönüşüm süreci.", "en": "Design to reality transformation process."}',
 '{"tr": "SHINEST İç Mimarlık olarak, tasarımdan gerçeğe dönüşüm sürecinde yanınızdayız. Proje yönetimi, koordinasyon ve kaliteli işçilikle hayalinizdeki mekanı yaratıyoruz.", "en": "As SHINEST Interior Architecture, we are with you in the design to reality transformation process. We create your dream space with project management, coordination and quality craftsmanship."}',
 '{"tr": ["Proje yönetimi", "Kalite kontrolü", "Tedarikçi koordinasyonu", "Bütçe yönetimi", "Zaman planlaması", "Teslim sonrası destek"], "en": ["Project management", "Quality control", "Supplier coordination", "Budget management", "Time planning", "Post-delivery support"]}',
 '{"tr": [{"title": "Planlama", "description": "Uygulama sürecinin tüm aşamalarını detaylı bir şekilde planlarız."}, {"title": "Tedarik", "description": "Projede kullanılacak tüm malzeme ve ürünlerin tedarik sürecini yönetiriz."}, {"title": "Uygulama", "description": "Profesyonel ekibimizle tasarımınızı hayata geçiririz."}, {"title": "Kalite Kontrolü", "description": "Uygulama sürecinin her aşamasında kalite kontrolü yaparız."}, {"title": "Teslim", "description": "Projeyi tamamladıktan sonra size teslim eder, gerekli bilgilendirmeleri yaparız."}], "en": [{"title": "Planning", "description": "We plan all phases of the implementation process in detail."}, {"title": "Procurement", "description": "We manage the procurement process of all materials and products to be used in the project."}, {"title": "Implementation", "description": "We bring your design to life with our professional team."}, {"title": "Quality Control", "description": "We perform quality control at every stage of the implementation process."}, {"title": "Delivery", "description": "After completing the project, we deliver it to you and provide necessary information."}]}',
 true, 3)
ON CONFLICT (slug) DO NOTHING;
