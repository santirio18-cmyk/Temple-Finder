// Social Service for Temple Finder
// This service provides social features like reviews, ratings, and sharing

export interface UserReview {
  id: string
  templeId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  images?: string[]
  visitDate?: string
  helpful: number
  createdAt: string
  updatedAt: string
}

export interface TempleRating {
  templeId: string
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface ShareContent {
  title: string
  description: string
  url: string
  image?: string
  hashtags?: string[]
}

export interface SocialStats {
  templeId: string
  totalVisits: number
  totalReviews: number
  totalPhotos: number
  totalShares: number
  recentActivity: number
}

export class SocialService {
  private reviews: UserReview[] = []
  private ratings: Map<string, TempleRating> = new Map()

  constructor() {
    this.initializeMockData()
  }

  /**
   * Initialize with mock social data
   */
  private initializeMockData(): void {
    // Mock reviews for various temples
    const mockReviews: UserReview[] = [
      {
        id: 'review-1',
        templeId: 'temple-1',
        userId: 'user-1',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        comment: 'Amazing spiritual experience! The temple is beautifully maintained and the atmosphere is very peaceful.',
        visitDate: '2024-01-15',
        helpful: 12,
        createdAt: '2024-01-16T10:30:00Z',
        updatedAt: '2024-01-16T10:30:00Z'
      },
      {
        id: 'review-2',
        templeId: 'temple-1',
        userId: 'user-2',
        userName: 'Rajesh Kumar',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4,
        comment: 'Great temple with rich history. The architecture is impressive and the priests are very knowledgeable.',
        visitDate: '2024-01-10',
        helpful: 8,
        createdAt: '2024-01-11T14:20:00Z',
        updatedAt: '2024-01-11T14:20:00Z'
      },
      {
        id: 'review-3',
        templeId: 'temple-9',
        userId: 'user-3',
        userName: 'Meera Patel',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        comment: 'Palani Murugan Temple is truly divine! The climb to the temple is challenging but worth it. The view from the top is breathtaking.',
        visitDate: '2024-01-05',
        helpful: 15,
        createdAt: '2024-01-06T09:15:00Z',
        updatedAt: '2024-01-06T09:15:00Z'
      },
      {
        id: 'review-4',
        templeId: 'temple-17',
        userId: 'user-4',
        userName: 'Suresh Reddy',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        comment: 'Tirupati Balaji Temple is one of the most sacred places. The darshan was amazing and the temple management is very efficient.',
        visitDate: '2024-01-01',
        helpful: 22,
        createdAt: '2024-01-02T16:45:00Z',
        updatedAt: '2024-01-02T16:45:00Z'
      }
    ]

    this.reviews = mockReviews
    this.calculateRatings()
  }

  /**
   * Get reviews for a temple
   */
  async getTempleReviews(templeId: string, limit: number = 10): Promise<UserReview[]> {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay
    
    return this.reviews
      .filter(review => review.templeId === templeId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }

  /**
   * Add a new review
   */
  async addReview(
    templeId: string,
    userId: string,
    userName: string,
    userAvatar: string | undefined,
    rating: number,
    comment: string,
    visitDate?: string
  ): Promise<UserReview> {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

    const newReview: UserReview = {
      id: `review-${Date.now()}`,
      templeId,
      userId,
      userName,
      userAvatar,
      rating,
      comment,
      visitDate,
      helpful: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.reviews.push(newReview)
    this.calculateRatings()

    return newReview
  }

  /**
   * Get temple rating statistics
   */
  async getTempleRating(templeId: string): Promise<TempleRating | null> {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API delay
    
    return this.ratings.get(templeId) || null
  }

  /**
   * Mark a review as helpful
   */
  async markReviewHelpful(reviewId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API delay
    
    const review = this.reviews.find(r => r.id === reviewId)
    if (review) {
      review.helpful += 1
      review.updatedAt = new Date().toISOString()
    }
  }

  /**
   * Get social stats for a temple
   */
  async getTempleSocialStats(templeId: string): Promise<SocialStats> {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay

    const templeReviews = this.reviews.filter(r => r.templeId === templeId)
    
    return {
      templeId,
      totalVisits: Math.floor(Math.random() * 1000) + 100, // Mock data
      totalReviews: templeReviews.length,
      totalPhotos: Math.floor(Math.random() * 50) + 10, // Mock data
      totalShares: Math.floor(Math.random() * 100) + 20, // Mock data
      recentActivity: Math.floor(Math.random() * 20) + 5 // Mock data
    }
  }

  /**
   * Share temple content
   */
  async shareTemple(
    templeId: string,
    templeName: string,
    templeDescription: string,
    platform: 'facebook' | 'twitter' | 'whatsapp' | 'telegram' | 'copy'
  ): Promise<string> {
    const shareContent: ShareContent = {
      title: `Visit ${templeName}`,
      description: templeDescription,
      url: `${window.location.origin}/temple/${templeId}`,
      hashtags: ['TempleFinder', 'SacredPlaces', 'SpiritualJourney']
    }

    const shareText = `${shareContent.title}\n\n${shareContent.description}\n\n${shareContent.url}${shareContent.hashtags ? `\n\n#${shareContent.hashtags.join(' #')}` : ''}`

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}`
      
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
      
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(shareText)}`
      
      case 'telegram':
        return `https://t.me/share/url?url=${encodeURIComponent(shareContent.url)}&text=${encodeURIComponent(shareContent.title)}`
      
      case 'copy':
        await navigator.clipboard.writeText(shareText)
        return 'copied'
      
      default:
        return shareContent.url
    }
  }

  /**
   * Get trending temples based on social activity
   */
  async getTrendingTemples(limit: number = 5): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 400)) // Simulate API delay

    const templeActivity = new Map<string, number>()
    
    this.reviews.forEach(review => {
      const activity = templeActivity.get(review.templeId) || 0
      templeActivity.set(review.templeId, activity + 1)
    })

    return Array.from(templeActivity.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([templeId]) => templeId)
  }

  /**
   * Calculate ratings for all temples
   */
  private calculateRatings(): void {
    const templeReviews = new Map<string, UserReview[]>()

    this.reviews.forEach(review => {
      if (!templeReviews.has(review.templeId)) {
        templeReviews.set(review.templeId, [])
      }
      templeReviews.get(review.templeId)!.push(review)
    })

    templeReviews.forEach((reviews, templeId) => {
      const totalReviews = reviews.length
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      
      const ratingDistribution = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
      }

      this.ratings.set(templeId, {
        templeId,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        ratingDistribution
      })
    })
  }

  /**
   * Get user's review for a temple
   */
  async getUserTempleReview(templeId: string, userId: string): Promise<UserReview | null> {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API delay
    
    return this.reviews.find(review => 
      review.templeId === templeId && review.userId === userId
    ) || null
  }

  /**
   * Update an existing review
   */
  async updateReview(
    reviewId: string,
    rating: number,
    comment: string,
    visitDate?: string
  ): Promise<UserReview | null> {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

    const review = this.reviews.find(r => r.id === reviewId)
    if (review) {
      review.rating = rating
      review.comment = comment
      review.visitDate = visitDate
      review.updatedAt = new Date().toISOString()
      
      this.calculateRatings()
      return review
    }
    
    return null
  }
}

export const socialService = new SocialService()
