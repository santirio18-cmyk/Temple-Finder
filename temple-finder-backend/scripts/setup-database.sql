-- Temple Finder Database Setup
-- This script creates the database and initial tables

-- Create database
CREATE DATABASE temple_finder_prod;

-- Create user
CREATE USER temple_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE temple_finder_prod TO temple_user;

-- Connect to the database
\c temple_finder_prod;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable GIN extension for JSON search
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create indexes for better performance
-- These will be created automatically by Sequelize, but here for reference:

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Temples table indexes
CREATE INDEX IF NOT EXISTS idx_temples_name ON temples(name);
CREATE INDEX IF NOT EXISTS idx_temples_deity ON temples(deity);
CREATE INDEX IF NOT EXISTS idx_temples_city ON temples(city);
CREATE INDEX IF NOT EXISTS idx_temples_state ON temples(state);
CREATE INDEX IF NOT EXISTS idx_temples_category ON temples(category);
CREATE INDEX IF NOT EXISTS idx_temples_is_active ON temples(is_active);
CREATE INDEX IF NOT EXISTS idx_temples_featured ON temples(featured);
CREATE INDEX IF NOT EXISTS idx_temples_rating ON temples(rating);

-- Reviews table indexes
CREATE INDEX IF NOT EXISTS idx_reviews_temple_id ON reviews(temple_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Events table indexes
CREATE INDEX IF NOT EXISTS idx_events_temple_id ON events(temple_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_end_date ON events(end_date);

-- User favorites indexes
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_temple_id ON user_favorites(temple_id);

-- User visits indexes
CREATE INDEX IF NOT EXISTS idx_user_visits_user_id ON user_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_visits_temple_id ON user_visits(temple_id);
CREATE INDEX IF NOT EXISTS idx_user_visits_visit_date ON user_visits(visit_date);

-- Spatial indexes for location-based queries
-- Note: For production, consider using PostGIS for advanced spatial queries
CREATE INDEX IF NOT EXISTS idx_temples_coordinates_lat ON temples USING btree ((coordinates->>'lat')::float);
CREATE INDEX IF NOT EXISTS idx_temples_coordinates_lng ON temples USING btree ((coordinates->>'lng')::float);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_temples_search ON temples USING gin(to_tsvector('english', name || ' ' || description || ' ' || deity || ' ' || location));

-- Grant table permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO temple_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO temple_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO temple_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO temple_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO temple_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO temple_user;

-- Create a function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(lat1 float, lng1 float, lat2 float, lng2 float)
RETURNS float AS $$
DECLARE
    earth_radius float := 6371; -- Earth's radius in kilometers
    dlat float;
    dlng float;
    a float;
    c float;
BEGIN
    dlat := radians(lat2 - lat1);
    dlng := radians(lng2 - lng1);
    
    a := sin(dlat/2) * sin(dlat/2) + 
         cos(radians(lat1)) * cos(radians(lat2)) * 
         sin(dlng/2) * sin(dlng/2);
    
    c := 2 * atan2(sqrt(a), sqrt(1-a));
    
    RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION calculate_distance(float, float, float, float) TO temple_user;

-- Create a view for nearby temples
CREATE OR REPLACE VIEW nearby_temples AS
SELECT 
    t.*,
    calculate_distance(
        t.coordinates->>'lat'::float,
        t.coordinates->>'lng'::float,
        $1::float,
        $2::float
    ) as distance
FROM temples t
WHERE t.is_active = true
ORDER BY distance;

-- Grant select permission on the view
GRANT SELECT ON nearby_temples TO temple_user;

COMMENT ON DATABASE temple_finder_prod IS 'Production database for Temple Finder application';
COMMENT ON FUNCTION calculate_distance(float, float, float, float) IS 'Calculate distance between two geographic points in kilometers';




