import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Compass, Heart, User } from 'lucide-react'

const BottomNavigation: React.FC = () => {
  const location = useLocation()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      label: 'Discover'
    },
    {
      name: 'Explore',
      path: '/categories',
      icon: Compass,
      label: 'Explore'
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: Heart,
      label: 'Favorites'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
      label: 'Profile'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary-500' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNavigation
