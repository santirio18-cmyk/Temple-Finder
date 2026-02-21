import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Heart, Star, Settings, Bell, HelpCircle, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
            Please sign in
          </h2>
          <p className="text-neutral-600 mb-6">
            Sign in to access your profile and favorites
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-neutral-900">
                {user.name}
              </h1>
              <p className="text-neutral-600">{user.email}</p>
              <p className="text-sm text-neutral-500">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">12</p>
            <p className="text-sm text-neutral-600">Favorite Temples</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">8</p>
            <p className="text-sm text-neutral-600">Reviews Written</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <User className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">25</p>
            <p className="text-sm text-neutral-600">Temples Visited</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <button
              onClick={() => navigate('/favorites')}
              className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-medium text-neutral-900">My Favorites</span>
              </div>
              <span className="text-neutral-400">→</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <button
              onClick={() => navigate('/notifications')}
              className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-neutral-900">Notifications</span>
              </div>
              <span className="text-neutral-400">→</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-neutral-500" />
                <span className="font-medium text-neutral-900">Settings</span>
              </div>
              <span className="text-neutral-400">→</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-neutral-500" />
                <span className="font-medium text-neutral-900">Help & Support</span>
              </div>
              <span className="text-neutral-400">→</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </div>
              <span className="text-red-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
