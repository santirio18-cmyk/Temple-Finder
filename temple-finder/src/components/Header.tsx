import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Bell, Menu } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉️</span>
            </div>
            <span className="font-heading font-bold text-xl text-neutral-900">
              Temple Finder
            </span>
          </Link>

          {/* Search Bar - Only show on home page */}
          {location.pathname === '/' && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search temples, deities, or locations..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link
              to="/notifications"
              className="p-2 text-neutral-600 hover:text-primary-500 transition-colors relative"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center space-x-2 p-2 text-neutral-600 hover:text-primary-500 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium text-sm">
                  {user ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <span className="hidden sm:block font-medium">
                {user ? user.name : 'Profile'}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button className="p-2 text-neutral-600 hover:text-primary-500 transition-colors lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
