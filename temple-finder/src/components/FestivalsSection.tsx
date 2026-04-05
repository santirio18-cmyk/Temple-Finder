import { upcomingFestivals } from '@/data'

export default function FestivalsSection() {
  return (
    <section className="px-4 py-5">
      <h2 className="text-lg font-bold text-foreground mb-4">Festivals &amp; Utsavams</h2>
      <div className="space-y-3">
        {upcomingFestivals.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl bg-white border border-muted/80 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">{f.name}</p>
                <p className="text-xs text-darshanam-orange font-medium mt-0.5">{f.dateLabel}</p>
              </div>
              <span className="text-lg" aria-hidden>
                🪔
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
