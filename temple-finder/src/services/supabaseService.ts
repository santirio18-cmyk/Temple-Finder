import { supabase, supabaseHelpers } from '../lib/supabase'
import { Temple, SearchFilters, DeityCategory, PoojaTiming, Review, User } from '../types'

export class SupabaseService {
  // Temple operations
  async getTemples(filters?: {
    deity?: string
    state?: string
    city?: string
    rating_min?: number
    limit?: number
  }): Promise<Temple[]> {
    try {
      const data = await supabaseHelpers.getTemples(filters)
      return this.transformTemples(data || [])
    } catch (error) {
      console.error('Error fetching temples:', error)
      return []
    }
  }

  async searchTemples(query: string, filters?: SearchFilters): Promise<Temple[]> {
    try {
      const data = await supabaseHelpers.searchTemples(query, filters)
      return this.transformTemples(data || [])
    } catch (error) {
      console.error('Error searching temples:', error)
      return []
    }
  }

  async getTempleById(id: string): Promise<Temple | null> {
    try {
      const data = await supabaseHelpers.getTempleById(id)
      return data ? this.transformTemple(data) : null
    } catch (error) {
      console.error('Error fetching temple:', error)
      return null
    }
  }

  // User operations
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) return null

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      return profile ? this.transformUser(profile) : null
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  async signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: name
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }

        return { user: this.transformUser({ id: data.user.id, email: data.user.email!, name }), error: null }
      }

      return { user: null, error: 'Failed to create user' }
    } catch (error) {
      console.error('Error signing up:', error)
      return { user: null, error: 'An unexpected error occurred' }
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (data.user) {
        const user = await this.getCurrentUser()
        return { user, error: null }
      }

      return { user: null, error: 'Failed to sign in' }
    } catch (error) {
      console.error('Error signing in:', error)
      return { user: null, error: 'An unexpected error occurred' }
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error: error?.message || null }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error: 'An unexpected error occurred' }
    }
  }

  // Favorites operations
  async getUserFavorites(userId: string): Promise<Temple[]> {
    try {
      const data = await supabaseHelpers.getUserFavorites(userId)
      return this.transformTemples(data || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
      return []
    }
  }

  async toggleFavorite(userId: string, templeId: string, isFavorite: boolean): Promise<void> {
    try {
      await supabaseHelpers.toggleFavorite(userId, templeId, isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  }

  async isFavorite(userId: string, templeId: string): Promise<boolean> {
    try {
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('temple_id', templeId)
        .single()

      return !!data
    } catch (error) {
      return false
    }
  }

  // Reviews operations
  async getTempleReviews(templeId: string): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          users!inner(name)
        `)
        .eq('temple_id', templeId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return this.transformReviews(data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
      return []
    }
  }

  async addReview(templeId: string, userId: string, rating: number, comment: string, visitDate?: string): Promise<Review | null> {
    try {
      const data = await supabaseHelpers.addReview(templeId, userId, rating, comment, visitDate)
      return data ? this.transformReview(data) : null
    } catch (error) {
      console.error('Error adding review:', error)
      return null
    }
  }

  // Pooja timings operations
  async getTempleTimings(templeId: string): Promise<PoojaTiming[]> {
    try {
      const { data, error } = await supabase
        .from('pooja_timings')
        .select('*')
        .eq('temple_id', templeId)
        .order('start_time', { ascending: true })

      if (error) throw error
      return this.transformPoojaTimings(data || [])
    } catch (error) {
      console.error('Error fetching timings:', error)
      return []
    }
  }

  // Deity categories operations
  async getDeityCategories(): Promise<DeityCategory[]> {
    try {
      const { data, error } = await supabase
        .from('deity_categories')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      return this.transformDeityCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Data transformation methods
  private transformTemples(data: any[]): Temple[] {
    return data.map(item => this.transformTemple(item))
  }

  private transformTemple(data: any): Temple {
    return {
      id: data.id,
      name: data.name,
      deity: data.deity,
      description: data.description,
      history: data.history || '',
      significance: data.significance || '',
      architecture: data.architecture || '',
      legends: data.legends || [],
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      locality: data.locality || data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
      website: data.website,
      images: data.images || [],
      capacity: data.capacity,
      current_occupancy: data.current_occupancy,
      rating: data.rating,
      review_count: data.review_count,
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  }

  private transformUser(data: any): User {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar_url,
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  }

  private transformReviews(data: any[]): Review[] {
    return data.map(item => this.transformReview(item))
  }

  private transformReview(data: any): Review {
    return {
      id: data.id,
      temple_id: data.temple_id,
      user_id: data.user_id,
      user_name: data.users?.name || 'Anonymous',
      user_avatar: data.users?.avatar_url,
      rating: data.rating,
      comment: data.comment,
      visit_date: data.visit_date || new Date().toISOString().split('T')[0],
      images: data.images || [],
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  }

  private transformPoojaTimings(data: any[]): PoojaTiming[] {
    return data.map(item => ({
      id: item.id,
      temple_id: item.temple_id,
      name: item.name,
      start_time: item.start_time,
      end_time: item.end_time,
      description: item.description || '',
      is_special: item.is_special,
      day_of_week: item.day_of_week,
      created_at: item.created_at,
      updated_at: item.updated_at
    }))
  }

  private transformDeityCategories(data: any[]): DeityCategory[] {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      description: item.description,
      temple_count: item.temple_count,
      color: item.color
    }))
  }
}

// Export singleton instance
export const supabaseService = new SupabaseService()
