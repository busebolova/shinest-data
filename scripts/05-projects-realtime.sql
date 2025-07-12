-- Enable real-time for projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{}',
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  year TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured_image TEXT,
  images JSONB DEFAULT '[]',
  description JSONB DEFAULT '{}',
  full_description JSONB DEFAULT '{}',
  client TEXT,
  area TEXT,
  duration TEXT,
  tags JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published projects
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

-- Allow authenticated users to manage all projects
CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE projects;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (title, slug, category, location, year, status, featured_image, images, description, full_description, client, area, duration, tags, featured) VALUES
(
  '{"tr": "Modern Banyo Tasarımı", "en": "Modern Bathroom Design", "de": "Modernes Badezimmer Design"}',
  'modern-banyo-tasarimi',
  'Banyo Tasarımı',
  'İzmir, Türkiye',
  '2024',
  'published',
  '/images/bathroom-design-1.png',
  '["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"]',
  '{"tr": "Modern ve şık banyo tasarımı projesi", "en": "Modern and elegant bathroom design project"}',
  '{"tr": "Bu proje, modern yaşamın gereksinimlerini karşılayan fonksiyonel ve estetik bir banyo tasarımı sunmaktadır.", "en": "This project offers a functional and aesthetic bathroom design that meets the requirements of modern life."}',
  'Özel Müşteri',
  '12 m²',
  '4 hafta',
  '["modern", "banyo", "tasarım"]',
  true
),
(
  '{"tr": "Kafe İç Mekan Tasarımı", "en": "Cafe Interior Design", "de": "Café Innenarchitektur"}',
  'kafe-ic-mekan-tasarimi',
  'Kafe Tasarımı',
  'İstanbul, Türkiye',
  '2024',
  'published',
  '/images/cafe-design-1.png',
  '["/images/cafe-design-1.png", "/images/cafe-design-2.png"]',
  '{"tr": "Sıcak ve davetkar kafe iç mekan tasarımı", "en": "Warm and inviting cafe interior design"}',
  '{"tr": "Kafe tasarımında müşteri konforu ve deneyimi ön planda tutulmuştur.", "en": "Customer comfort and experience are prioritized in the cafe design."}',
  'Kafe Sahibi',
  '85 m²',
  '6 hafta',
  '["kafe", "ticari", "sıcak"]',
  false
);
