import { NavLink } from 'react-router-dom'
import { Home, Search, MapPin, Grid3X3 } from 'lucide-react'

const tabs = [
  { to: '/', end: true, label: 'Home', icon: Home },
  { to: '/search', end: false, label: 'Search', icon: Search },
  { to: '/nearby', end: false, label: 'Nearby', icon: MapPin },
  { to: '/categories', end: false, label: 'Deities', icon: Grid3X3 },
] as const

export default function BottomTabs() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto border-t border-muted bg-background/95 backdrop-blur-md safe-area-pb"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to + String(end)}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-darshanam-orange'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
