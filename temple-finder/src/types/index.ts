export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Temple {
  id: string
  name: string
  deity: string
  description: string
  history?: string
  significance?: string
  architecture?: string
  legends?: string[]
  festivals?: string[]
  address: string
  city: string
  state: string
  country: string
  locality: string
  latitude: number
  longitude: number
  contact_phone?: string
  contact_email?: string
  website?: string
  images: string[]
  capacity: number
  current_occupancy: number
  rating: number
  review_count: number
  is_favorite?: boolean
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface PoojaTiming {
  id: string
  temple_id: string
  name: string
  start_time: string
  end_time: string
  description: string
  is_special: boolean
  day_of_week: number[] // 0-6 (Sunday-Saturday)
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  temple_id: string
  user_id: string
  user_name: string
  user_avatar?: string
  rating: number
  comment: string
  visit_date: string
  images: string[]
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  temple_id: string
  created_at: string
}

export interface Location {
  country: string
  state: string
  city: string
  locality: string
}

export interface SearchFilters {
  query?: string
  deity?: string
  location?: Location
  rating_min?: number
  crowd_level?: 'low' | 'medium' | 'high'
  distance_km?: number
}

export interface CrowdLevel {
  level: 'low' | 'medium' | 'high'
  percentage: number
  description: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'timing_update' | 'crowd_alert' | 'festival' | 'general'
  temple_id?: string
  is_read: boolean
  created_at: string
}

export interface DeityCategory {
  id: string
  name: string
  icon: string
  description: string
  temple_count: number
  color: string
  mantra?: string
  image?: string
  created_at?: string
  updated_at?: string
}
