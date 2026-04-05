import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, User } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'

function getTamilGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Iniya Kaalai Vanakkam'
  if (hour < 17) return 'Iniya Madhyanam Vanakkam'
  return 'Iniya Sayanthiram Vanakkam'
}

interface HeaderSectionProps {
  onProfileClick: () => void
}

export default function HeaderSection({ onProfileClick }: HeaderSectionProps) {
  const navigate = useNavigate()
  const { userName } = useUser()
  const [searchQuery, setSearchQuery] = useState('')
  const location = 'Chennai, TN'

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/search')
    }
  }

  return (
    <div className="relative min-h-[300px] bg-temple-hero bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      <div className="relative flex items-center justify-between px-4 pt-4">
        <span className="text-sm text-white/90 font-medium">Home</span>
        <button
          type="button"
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          aria-label="Profile"
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="relative flex items-center gap-1.5 px-4 pt-2">
        <MapPin className="w-4 h-4 text-white" />
        <span className="text-sm text-white font-medium">{location}</span>
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 pt-6 pb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-md font-['Playfair_Display',_serif]">
          {getTamilGreeting()}, {userName}
        </h1>
        <p className="text-sm text-white/95 mb-5 drop-shadow-sm">
          May your day be filled with divine energy.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Temples, Deities, or Festivals..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 shadow-lg border border-white/50 text-darshanam-brown placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-darshanam-orange/50 focus:border-darshanam-orange"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
