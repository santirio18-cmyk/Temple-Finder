import React from 'react'

interface PulseAnimationProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

const PulseAnimation: React.FC<PulseAnimationProps> = ({ 
  children, 
  className = '', 
  duration = 1000 
}) => {
  return (
    <div 
      className={`animate-pulse ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

export default PulseAnimation









