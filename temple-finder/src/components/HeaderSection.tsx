import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, User, Search } from 'lucide-react'
import '@fontsource/crimson-text/400.css'
import templeHeaderBg from '@/assets/temple-header-bg.png'
import { useUser } from '@/contexts/UserContext'

function getTamilGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Iniya Kaalai Vanakkam'        // Morning (before noon)
  if (hour < 17) return 'Iniya Madhyanam Vanakkam'     // Afternoon (12 PM - 5 PM)
  if (hour < 21) return 'Iniya Sayanthiram Vanakkam'   // Evening (5 PM - 9 PM)
  return 'Iniya Iravu Vanakkam'                         // Night (9 PM onwards)
}

interface HeaderSectionProps {
  onProfileClick: () => void
}

export default function HeaderSection({ onProfileClick }: HeaderSectionProps) {
  const navigate = useNavigate()
  const { userName } = useUser()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/search')
    }
  }

  return (
    <div className="relative">
      <div className="relative px-3 pt-12 pb-10 text-foreground overflow-hidden min-h-[440px] flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${templeHeaderBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-40% to-background/90" />

        <div className="flex items-center justify-between mb-4 relative z-20">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-foreground/80" />
            <span className="text-sm font-body font-medium text-foreground/80">Chennai, TN</span>
          </div>
          <button
            type="button"
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center backdrop-blur-sm border border-foreground/10"
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-foreground/70" />
          </button>
        </div>

        <div className="flex-1" />

        <div className="relative z-20 mt-auto">
          <h1
            className="font-normal text-2xl font-serif px-[12px]"
            style={{ color: '#312116', fontFamily: "'Crimson Text', serif", fontSize: '28px' }}
          >
            {getTamilGreeting()}, {userName}
          </h1>
          <p className="text-sm font-body px-[12px]" style={{ color: '#664633', marginTop: '2px' }}>
            May your day be filled with divine energy.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative z-20 mx-1" style={{ marginTop: '16px' }}>
          <div
            className="flex items-center gap-2.5 bg-card/80 backdrop-blur-md px-3.5 py-3 border border-border/50 shadow-card-warm"
            style={{ borderRadius: '24px' }}
          >
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Temples, Deities, or Festivals..."
              className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
