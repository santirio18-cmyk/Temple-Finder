import { categories } from '@/data'

const quotes = [
  { sanskrit: 'सर्वे भवन्तु सुखिनः', translation: 'May all beings be happy' },
  { sanskrit: 'तमसो मा ज्योतिर्गमय', translation: 'From darkness, lead me to light' },
  { sanskrit: 'ॐ शान्तिः शान्तिः शान्तिः', translation: 'Peace, peace, peace' },
]

export default function SacredToday() {
  const dayIndex = Math.floor(Date.now() / 86400000) % categories.length
  const mantra = categories[dayIndex]?.mantra ?? 'Om Namah Shivaya'
  const quote = quotes[Math.floor(Date.now() / 86400000) % quotes.length]

  return (
    <section className="px-4 py-5">
      <div className="rounded-2xl bg-white/90 border border-temple-gold/20 shadow-sm p-5">
        <p className="text-[10px] uppercase tracking-widest text-darshanam-orange font-semibold mb-2">
          Sacred today
        </p>
        <p className="text-sm font-medium text-foreground mb-1">{mantra}</p>
        <div className="h-px bg-temple-gold/25 my-3" />
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          “{quote.sanskrit}” — {quote.translation}
        </p>
      </div>
    </section>
  )
}
