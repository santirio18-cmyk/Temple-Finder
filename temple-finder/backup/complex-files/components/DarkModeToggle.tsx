import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface DarkModeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className = '', size = 'md' }) => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        bg-neutral-200 dark:bg-neutral-700
        hover:bg-neutral-300 dark:hover:bg-neutral-600
        text-neutral-700 dark:text-neutral-300
        rounded-full
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative">
        <Sun 
          className={`
            ${iconSizeClasses[size]} 
            absolute transition-all duration-300 ease-in-out
            ${isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
          `} 
        />
        <Moon 
          className={`
            ${iconSizeClasses[size]} 
            absolute transition-all duration-300 ease-in-out
            ${isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
          `} 
        />
      </div>
    </button>
  )
}

export default DarkModeToggle









