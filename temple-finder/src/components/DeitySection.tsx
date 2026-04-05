import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { categories } from '@/data'

export default function DeitySection() {
  const navigate = useNavigate()

  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Explore by Deity</h2>
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="text-sm font-medium text-darshanam-orange hover:underline flex items-center gap-0.5"
        >
          See all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => navigate(`/search?deity=${encodeURIComponent(c.name)}`)}
            className="rounded-2xl bg-white border border-muted/80 p-4 text-left shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-2xl block mb-2">{c.icon}</span>
            <span className="font-semibold text-foreground text-sm">{c.name}</span>
            {c.mantra && (
              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{c.mantra}</p>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
