import { ArrowLeft, User } from 'lucide-react'

interface PageHeaderProps {
  title: string
  onBack?: () => void
  onProfileClick?: () => void
}

export default function PageHeader({ title, onBack, onProfileClick }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-darshanam-beige/95 backdrop-blur-sm border-b border-darshanam-brown/10">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-white/50 text-darshanam-brown flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-bold text-darshanam-brown truncate">{title}</h1>
        </div>
        {onProfileClick && (
          <button
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-darshanam-brown" />
          </button>
        )}
      </div>
    </div>
  )
}
