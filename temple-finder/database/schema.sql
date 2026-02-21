-- Temple Finder Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE day_of_week AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create deity_categories table
CREATE TABLE IF NOT EXISTS public.deity_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    temple_count INTEGER DEFAULT 0,
    color TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create temples table
CREATE TABLE IF NOT EXISTS public.temples (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    deity TEXT NOT NULL,
    description TEXT NOT NULL,
    history TEXT,
    significance TEXT,
    architecture TEXT,
    legends TEXT[],
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    locality TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    contact_phone TEXT,
    contact_email TEXT,
    website TEXT,
    images TEXT[],
    capacity INTEGER NOT NULL DEFAULT 100,
    current_occupancy INTEGER NOT NULL DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pooja_timings table
CREATE TABLE IF NOT EXISTS public.pooja_timings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    temple_id UUID REFERENCES public.temples(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    description TEXT,
    is_special BOOLEAN DEFAULT false,
    day_of_week INTEGER[] NOT NULL, -- Array of integers 0-6 (Sunday-Saturday)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    temple_id UUID REFERENCES public.temples(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    visit_date DATE,
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(temple_id, user_id) -- One review per user per temple
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    temple_id UUID REFERENCES public.temples(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, temple_id) -- One favorite per user per temple
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_temples_city ON public.temples(city);
CREATE INDEX IF NOT EXISTS idx_temples_state ON public.temples(state);
CREATE INDEX IF NOT EXISTS idx_temples_deity ON public.temples(deity);
CREATE INDEX IF NOT EXISTS idx_temples_rating ON public.temples(rating DESC);
CREATE INDEX IF NOT EXISTS idx_temples_location ON public.temples USING GIST (ll_to_earth(latitude, longitude));
CREATE INDEX IF NOT EXISTS idx_reviews_temple_id ON public.reviews(temple_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_temple_id ON public.favorites(temple_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_temples_updated_at BEFORE UPDATE ON public.temples FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deity_categories_updated_at BEFORE UPDATE ON public.deity_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pooja_timings_updated_at BEFORE UPDATE ON public.pooja_timings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update temple rating when reviews change
CREATE OR REPLACE FUNCTION update_temple_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.temples 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM public.reviews 
            WHERE temple_id = COALESCE(NEW.temple_id, OLD.temple_id)
        ),
        review_count = (
            SELECT COUNT(*)
            FROM public.reviews 
            WHERE temple_id = COALESCE(NEW.temple_id, OLD.temple_id)
        )
    WHERE id = COALESCE(NEW.temple_id, OLD.temple_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create triggers for rating updates
CREATE TRIGGER update_temple_rating_on_review_insert
    AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_temple_rating();

CREATE TRIGGER update_temple_rating_on_review_update
    AFTER UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_temple_rating();

CREATE TRIGGER update_temple_rating_on_review_delete
    AFTER DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_temple_rating();

-- Create function to update deity category temple count
CREATE OR REPLACE FUNCTION update_deity_temple_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Update temple count for deity categories
    UPDATE public.deity_categories 
    SET temple_count = (
        SELECT COUNT(*)
        FROM public.temples 
        WHERE deity ILIKE '%' || deity_categories.name || '%'
        AND is_active = true
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create triggers for temple count updates
CREATE TRIGGER update_deity_count_on_temple_insert
    AFTER INSERT ON public.temples
    FOR EACH ROW EXECUTE FUNCTION update_deity_temple_count();

CREATE TRIGGER update_deity_count_on_temple_update
    AFTER UPDATE ON public.temples
    FOR EACH ROW EXECUTE FUNCTION update_deity_temple_count();

CREATE TRIGGER update_deity_count_on_temple_delete
    AFTER DELETE ON public.temples
    FOR EACH ROW EXECUTE FUNCTION update_deity_temple_count();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pooja_timings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deity_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Temples are publicly readable
CREATE POLICY "Temples are publicly readable" ON public.temples
    FOR SELECT USING (true);

-- Only authenticated users can insert/update temples (for admin functionality)
CREATE POLICY "Authenticated users can insert temples" ON public.temples
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update temples" ON public.temples
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Reviews are publicly readable
CREATE POLICY "Reviews are publicly readable" ON public.reviews
    FOR SELECT USING (true);

-- Users can insert their own reviews
CREATE POLICY "Users can insert own reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON public.reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON public.reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Users can view their own favorites
CREATE POLICY "Users can view own favorites" ON public.favorites
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own favorites
CREATE POLICY "Users can insert own favorites" ON public.favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete own favorites" ON public.favorites
    FOR DELETE USING (auth.uid() = user_id);

-- Pooja timings are publicly readable
CREATE POLICY "Pooja timings are publicly readable" ON public.pooja_timings
    FOR SELECT USING (true);

-- Only authenticated users can insert/update pooja timings
CREATE POLICY "Authenticated users can insert pooja timings" ON public.pooja_timings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update pooja timings" ON public.pooja_timings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Deity categories are publicly readable
CREATE POLICY "Deity categories are publicly readable" ON public.deity_categories
    FOR SELECT USING (true);

-- Only authenticated users can insert/update deity categories
CREATE POLICY "Authenticated users can insert deity categories" ON public.deity_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update deity categories" ON public.deity_categories
    FOR UPDATE USING (auth.role() = 'authenticated');
