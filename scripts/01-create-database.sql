-- Supabase veritabanı için temel tablolar

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    image TEXT,
    role VARCHAR(50) DEFAULT 'EDITOR',
    github_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İçerik blokları tablosu
CREATE TABLE IF NOT EXISTS content_blocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    content JSONB NOT NULL,
    metadata JSONB,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Blog yazıları tablosu
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title JSONB NOT NULL,
    content JSONB NOT NULL,
    excerpt JSONB,
    featured_image TEXT,
    status VARCHAR(50) DEFAULT 'DRAFT',
    published_at TIMESTAMP WITH TIME ZONE,
    seo_title JSONB,
    seo_description JSONB,
    tags TEXT[],
    category VARCHAR(100),
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id UUID REFERENCES users(id)
);

-- Projeler tablosu
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title JSONB NOT NULL,
    description JSONB,
    location JSONB,
    category VARCHAR(100),
    images TEXT[],
    featured_image TEXT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    order_index INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    client_name VARCHAR(255),
    project_type VARCHAR(100),
    area VARCHAR(100),
    budget VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Hizmetler tablosu
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    full_description JSONB,
    features JSONB,
    process JSONB,
    image TEXT,
    icon TEXT,
    price VARCHAR(100),
    duration VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form başvuruları tablosu
CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'NEW',
    notes TEXT,
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medya dosyaları tablosu
CREATE TABLE IF NOT EXISTS media_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size INTEGER NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt JSONB,
    folder VARCHAR(255),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site ayarları tablosu
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter tablosu
CREATE TABLE IF NOT EXISTS newsletter (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    language VARCHAR(10) DEFAULT 'TR',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics tablosu
CREATE TABLE IF NOT EXISTS analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page VARCHAR(255) NOT NULL,
    event VARCHAR(255) NOT NULL,
    data JSONB,
    user_agent TEXT,
    ip VARCHAR(45),
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
