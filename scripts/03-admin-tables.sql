-- Admin paneli için ek tablolar

-- Admin kullanıcıları tablosu
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ADMIN',
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sayfa içerikleri tablosu
CREATE TABLE IF NOT EXISTS page_contents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_slug VARCHAR(255) NOT NULL,
    section_key VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL, -- TEXT, RICH_TEXT, IMAGE, GALLERY
    content JSONB NOT NULL,
    metadata JSONB,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id),
    UNIQUE(page_slug, section_key)
);

-- Medya kütüphanesi tablosu
CREATE TABLE IF NOT EXISTS media_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text JSONB,
    caption JSONB,
    folder VARCHAR(255),
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by UUID REFERENCES admin_users(id)
);

-- Sayfa ayarları tablosu
CREATE TABLE IF NOT EXISTS page_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_slug VARCHAR(255) UNIQUE NOT NULL,
    title JSONB NOT NULL,
    description JSONB,
    keywords JSONB,
    og_image TEXT,
    is_published BOOLEAN DEFAULT true,
    template VARCHAR(100),
    custom_css TEXT,
    custom_js TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İlk admin kullanıcısı ekle
INSERT INTO admin_users (email, password_hash, name, role) VALUES 
('admin@shinest.com', '$2b$10$rQZ8kqH5FqJ5J5J5J5J5JeJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J', 'SHINEST Admin', 'SUPER_ADMIN')
ON CONFLICT (email) DO NOTHING;
