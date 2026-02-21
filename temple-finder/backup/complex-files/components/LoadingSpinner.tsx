import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`
        ${sizeClasses[size]} 
        border-4 border-primary-200 border-t-primary-500 
        rounded-full animate-spin
      `}></div>
      {text && (
        <p className={`text-neutral-600 dark:text-neutral-400 ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner









