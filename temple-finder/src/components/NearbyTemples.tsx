import { MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { temples } from '@/data'

export default function NearbyTemples() {
  const navigate = useNavigate()
  const list = temples.slice(0, 6)

  return (
    <section className="pt-5 pb-5 bg-background relative z-10 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4 px-3">
        <h2 className="text-lg font-display font-semibold text-foreground">
          Discover Temples Nearby
        </h2>
        <button
          type="button"
          onClick={() => navigate('/nearby')}
          className="text-xs font-body text-saffron font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-[14px]"
        style={{ scrollSnapType: 'x mandatory' }}
        aria-label="Nearby temples"
      >
        {list.map((temple) => (
          <button
            key={temple.id}
            type="button"
            onClick={() => navigate(`/temple/${temple.id}`)}
            className="flex-shrink-0 w-[150px] rounded-2xl overflow-hidden bg-card shadow-card-warm cursor-pointer group border border-border/30 text-left"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative h-[120px]">
              <img
                src={temple.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-body font-medium bg-background/80 backdrop-blur-sm text-foreground/90 border border-border/30">
                {temple.deity}
              </span>
            </div>
            <div className="p-2.5">
              <p className="text-[11px] font-body font-medium text-foreground leading-tight line-clamp-2">
                {temple.name}
              </p>
              <p className="text-[10px] font-body text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-destructive flex-shrink-0" />
                {temple.address}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
