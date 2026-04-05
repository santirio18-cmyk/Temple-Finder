import { Home, BookOpen, Search, MapPin } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Panchang', path: '/panchang' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: MapPin, label: 'Nearby', path: '/nearby' },
] as const

export default function BottomTabs() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto">
      <div className="h-[1.5px] bg-gradient-to-r from-transparent via-temple-gold/40 to-transparent" />
      <div className="bg-card/95 backdrop-blur-md border-t border-border/50">
        <div className="flex items-center justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom,8px))]">
          {tabs.map((tab) => {
            const active = isActive(tab.path)
            return (
              <button
                key={tab.path}
                type="button"
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all duration-200 relative ${
                  active ? 'text-saffron' : 'text-muted-foreground hover:text-saffron/60'
                }`}
              >
                {active && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-saffron" />
                )}
                <tab.icon className="w-5 h-5" />
                <span className="text-[10px] font-body font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
