import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      temples: {
        Row: {
          id: string
          name: string
          deity: string
          description: string
          history: string | null
          significance: string | null
          architecture: string | null
          legends: string[] | null
          address: string
          city: string
          state: string
          country: string
          locality: string | null
          latitude: number
          longitude: number
          contact_phone: string | null
          contact_email: string | null
          website: string | null
          images: string[] | null
          capacity: number
          current_occupancy: number
          rating: number
          review_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          deity: string
          description: string
          history?: string | null
          significance?: string | null
          architecture?: string | null
          legends?: string[] | null
          address: string
          city: string
          state: string
          country: string
          locality?: string | null
          latitude: number
          longitude: number
          contact_phone?: string | null
          contact_email?: string | null
          website?: string | null
          images?: string[] | null
          capacity: number
          current_occupancy?: number
          rating?: number
          review_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          deity?: string
          description?: string
          history?: string | null
          significance?: string | null
          architecture?: string | null
          legends?: string[] | null
          address?: string
          city?: string
          state?: string
          country?: string
          locality?: string | null
          latitude?: number
          longitude?: number
          contact_phone?: string | null
          contact_email?: string | null
          website?: string | null
          images?: string[] | null
          capacity?: number
          current_occupancy?: number
          rating?: number
          review_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          temple_id: string
          user_id: string
          rating: number
          comment: string
          visit_date: string | null
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          temple_id: string
          user_id: string
          rating: number
          comment: string
          visit_date?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          temple_id?: string
          user_id?: string
          rating?: number
          comment?: string
          visit_date?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          temple_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          temple_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          temple_id?: string
          created_at?: string
        }
      }
      pooja_timings: {
        Row: {
          id: string
          temple_id: string
          name: string
          start_time: string
          end_time: string
          description: string | null
          is_special: boolean
          day_of_week: number[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          temple_id: string
          name: string
          start_time: string
          end_time: string
          description?: string | null
          is_special?: boolean
          day_of_week: number[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          temple_id?: string
          name?: string
          start_time?: string
          end_time?: string
          description?: string | null
          is_special?: boolean
          day_of_week?: number[]
          created_at?: string
          updated_at?: string
        }
      }
      deity_categories: {
        Row: {
          id: string
          name: string
          icon: string
          description: string
          temple_count: number
          color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          description: string
          temple_count?: number
          color: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          description?: string
          temple_count?: number
          color?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper functions for common operations
export const supabaseHelpers = {
  // Get all temples with optional filters
  async getTemples(filters?: {
    deity?: string
    state?: string
    city?: string
    rating_min?: number
    limit?: number
  }) {
    let query = supabase
      .from('temples')
      .select(`
        *,
        reviews!inner(rating)
      `)
      .eq('is_active', true)
      .order('rating', { ascending: false })

    if (filters?.deity) {
      query = query.ilike('deity', `%${filters.deity}%`)
    }
    if (filters?.state) {
      query = query.eq('state', filters.state)
    }
    if (filters?.city) {
      query = query.eq('city', filters.city)
    }
    if (filters?.rating_min) {
      query = query.gte('rating', filters.rating_min)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Search temples by query
  async searchTemples(query: string, filters?: {
    deity?: string
    state?: string
    city?: string
    rating_min?: number
  }) {
    let supabaseQuery = supabase
      .from('temples')
      .select(`
        *,
        reviews!inner(rating)
      `)
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,deity.ilike.%${query}%,description.ilike.%${query}%,city.ilike.%${query}%`)
      .order('rating', { ascending: false })

    if (filters?.deity) {
      supabaseQuery = supabaseQuery.ilike('deity', `%${filters.deity}%`)
    }
    if (filters?.state) {
      supabaseQuery = supabaseQuery.eq('state', filters.state)
    }
    if (filters?.city) {
      supabaseQuery = supabaseQuery.eq('city', filters.city)
    }
    if (filters?.rating_min) {
      supabaseQuery = supabaseQuery.gte('rating', filters.rating_min)
    }

    const { data, error } = await supabaseQuery
    if (error) throw error
    return data
  },

  // Get temple by ID
  async getTempleById(id: string) {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data
  },

  // Get user's favorites
  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        temple_id,
        temples(*)
      `)
      .eq('user_id', userId)
      .eq('temples.is_active', true)

    if (error) throw error
    return data?.map(fav => fav.temples).filter(Boolean)
  },

  // Add/remove favorite
  async toggleFavorite(userId: string, templeId: string, isFavorite: boolean) {
    if (isFavorite) {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, temple_id: templeId })
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('temple_id', templeId)
      if (error) throw error
    }
  },

  // Add review
  async addReview(templeId: string, userId: string, rating: number, comment: string, visitDate?: string) {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        temple_id: templeId,
        user_id: userId,
        rating,
        comment,
        visit_date: visitDate
      })
      .select()
      .single()

    if (error) throw error
    
    // Update temple rating
    await this.updateTempleRating(templeId)
    
    return data
  },

  // Update temple rating based on reviews
  async updateTempleRating(templeId: string) {
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('temple_id', templeId)

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      const { error } = await supabase
        .from('temples')
        .update({ 
          rating: Math.round(avgRating * 10) / 10,
          review_count: reviews.length 
        })
        .eq('id', templeId)
      
      if (error) throw error
    }
  }
}
