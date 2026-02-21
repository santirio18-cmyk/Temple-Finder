# Supabase Integration Setup Guide

This guide will help you set up Supabase for your Temple Finder app.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `temple-finder`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"

### 2. Get Your Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to execute the schema

### 5. Seed Initial Data

1. In the **SQL Editor**, create another new query
2. Copy and paste the contents of `database/seed_data.sql`
3. Click "Run" to populate the database with sample data

## 🔧 Database Schema Overview

The database includes the following tables:

### Core Tables
- **`temples`** - Temple information and details
- **`users`** - User profiles (extends Supabase auth)
- **`deity_categories`** - Categories of deities
- **`pooja_timings`** - Temple prayer timings
- **`reviews`** - User reviews and ratings
- **`favorites`** - User's favorite temples

### Key Features
- **Row Level Security (RLS)** - Secure data access
- **Automatic triggers** - Update ratings and counts
- **Full-text search** - Optimized temple search
- **Geographic indexing** - Location-based queries

## 🔐 Security Configuration

The database is configured with Row Level Security (RLS) policies:

- **Public read access** for temples, reviews, and categories
- **User-specific access** for favorites and user profiles
- **Authenticated user access** for creating reviews and favorites

## 📊 Sample Data

The seed data includes:
- **8 deity categories** (Shiva, Vishnu, Ganpati, etc.)
- **10 famous temples** across India
- **Sample pooja timings** for major temples
- **Sample reviews** and ratings

## 🚀 Testing the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any Supabase connection errors

3. Test the following features:
   - Browse temples on the home page
   - Search for temples
   - View temple details
   - Check if categories load properly

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check your `.env.local` file
   - Ensure the Supabase URL and anon key are correct

2. **"Permission denied" errors**
   - Verify RLS policies are enabled
   - Check if you're authenticated for user-specific operations

3. **Empty data**
   - Run the seed data script
   - Check if tables were created properly

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```env
VITE_SUPABASE_DEBUG=true
```

## 📈 Next Steps

After successful setup:

1. **Customize data** - Add your own temples and categories
2. **Configure authentication** - Set up email templates and auth providers
3. **Add real-time features** - Enable real-time subscriptions for live updates
4. **Set up storage** - Configure Supabase Storage for temple images

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Dashboard](https://app.supabase.com)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

## 📞 Support

If you encounter issues:
1. Check the [Supabase Status Page](https://status.supabase.com)
2. Visit the [Supabase Community](https://github.com/supabase/supabase/discussions)
3. Review the [Troubleshooting Guide](https://supabase.com/docs/guides/platform/troubleshooting)
