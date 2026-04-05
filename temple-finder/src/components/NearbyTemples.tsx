import { useNavigate } from 'react-router-dom'
import { MapPin, ChevronRight } from 'lucide-react'
import { temples } from '@/data'

export default function NearbyTemples() {
  const navigate = useNavigate()
  const nearbyTemples = temples.slice(0, 6)

  return (
    <section className="px-4 pb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Discover Temples Nearby</h2>
        <button
          type="button"
          onClick={() => navigate('/nearby')}
          className="flex items-center gap-1 text-darshanam-orange font-medium text-sm hover:underline"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide" aria-label="Nearby temples">
        {nearbyTemples.map((temple) => (
          <button
            key={temple.id}
            type="button"
            onClick={() => navigate(`/temple/${temple.id}`)}
            className="flex-shrink-0 w-[280px] text-left bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-muted/50"
          >
            <div className="h-40 bg-darshanam-cream overflow-hidden">
              <img
                src={temple.image}
                alt={temple.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-2 line-clamp-2">{temple.name}</h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="line-clamp-1">{temple.address}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
