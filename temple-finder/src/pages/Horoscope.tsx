import { useState, useEffect } from 'react'
import { Sparkles, Star, Clock, Lightbulb } from 'lucide-react'
import {
  zodiacSigns,
  getDailyHoroscope,
  type DailyHoroscope,
} from '@/services/horoscopeService'

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>('Aries')
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null)

  useEffect(() => {
    if (selectedSign) {
      setHoroscope(getDailyHoroscope(selectedSign))
    }
  }, [selectedSign])

  useEffect(() => {
    const savedSign = localStorage.getItem('selectedZodiacSign')
    if (savedSign) {
      setSelectedSign(savedSign)
    }
  }, [])

  const handleSignSelect = (signName: string) => {
    setSelectedSign(signName)
    localStorage.setItem('selectedZodiacSign', signName)
  }

  const currentZodiac = zodiacSigns.find((z) => z.name === selectedSign)

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative pb-24">
      <div className="fixed inset-0 pointer-events-none overflow-hidden max-w-lg mx-auto">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='30' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M100 10 Q115 50 100 100 Q85 50 100 10' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M190 100 Q150 115 100 100 Q150 85 190 100' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M100 190 Q85 150 100 100 Q115 150 100 190' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M10 100 Q50 85 100 100 Q50 115 10 100' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M163.6 36.4 Q130 65 100 100 Q65 65 163.6 36.4' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M163.6 163.6 Q130 135 100 100 Q135 130 163.6 163.6' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M36.4 163.6 Q65 135 100 100 Q65 130 36.4 163.6' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Cpath d='M36.4 36.4 Q65 65 100 100 Q70 65 36.4 36.4' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      <div className="text-center pt-6 pb-4 px-3">
        <div className="inline-flex items-center gap-2">
          <span className="text-lg">✨</span>
          <h1 className="text-2xl font-display font-bold text-shimmer-gold">
            Daily Horoscope
          </h1>
          <span className="text-lg">✨</span>
        </div>
        <div className="mx-auto mt-1.5 w-24 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--saffron))] to-transparent" />
        <p className="text-[11px] text-muted-foreground mt-2 px-4">
          Discover what the stars have aligned for you today
        </p>
      </div>

      <div className="px-3 mb-4">
        <h3 className="text-sm font-display font-semibold text-foreground mb-3 px-1">
          Select Your Zodiac Sign
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {zodiacSigns.map((sign) => (
            <button
              key={sign.name}
              type="button"
              onClick={() => handleSignSelect(sign.name)}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-lg transition-all ${
                selectedSign === sign.name
                  ? 'bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] text-white shadow-temple'
                  : 'bg-[hsl(30,40%,97%)] border border-[hsl(var(--temple-gold)/0.2)] text-foreground hover:border-[hsl(var(--temple-gold)/0.4)]'
              }`}
            >
              <span className="text-2xl">{sign.symbol}</span>
              <span className="text-[10px] font-body font-medium text-center leading-tight">
                {sign.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {horoscope && currentZodiac && (
        <>
          <div className="px-8 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
          </div>

          <div className="px-3 mb-4">
            <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="flex justify-between items-start pl-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">{currentZodiac.symbol}</span>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground">
                        {currentZodiac.name}
                      </h2>
                      <p className="text-xs font-body text-muted-foreground">
                        {currentZodiac.sanskrit}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 mt-3 mb-3">
                    <p className="text-xs font-body text-foreground">
                      <span className="font-semibold text-saffron">Element:</span>{' '}
                      {currentZodiac.element}
                    </p>
                    <p className="text-xs font-body text-foreground">
                      <span className="font-semibold text-saffron">Planet:</span>{' '}
                      {currentZodiac.rulingPlanet}
                    </p>
                    <p className="text-xs font-body text-foreground">
                      <span className="font-semibold text-saffron">Dates:</span>{' '}
                      {currentZodiac.dateRange}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 ml-3">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      backgroundColor: `${currentZodiac.luckyColor}22`,
                      border: `2px solid ${currentZodiac.luckyColor}44`,
                    }}
                  >
                    {currentZodiac.symbol}
                  </div>
                  <span className="text-[9px] font-body font-medium text-muted-foreground text-center">
                    Lucky Color
                  </span>
                  <span className="text-[10px] font-body font-semibold text-foreground">
                    {currentZodiac.luckyColor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
          </div>

          <div className="px-3 mb-4">
            <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="pl-3">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-saffron" />
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    Today&apos;s Prediction
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{horoscope.date}</p>
                <p className="text-sm font-body text-foreground leading-relaxed">
                  {horoscope.prediction}
                </p>
              </div>
            </div>
          </div>

          <div className="px-3 mb-4">
            <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="pl-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs font-body font-semibold text-muted-foreground leading-tight">
                        Lucky Number
                      </p>
                      <p className="text-2xl font-display font-bold text-foreground mt-1">
                        {horoscope.luckyNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs font-body font-semibold text-muted-foreground leading-tight">
                        Lucky Time
                      </p>
                      <p className="text-xs font-body font-semibold text-foreground mt-1">
                        {horoscope.luckyTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 mb-4">
            <div className="bg-gradient-to-br from-[hsl(var(--saffron)/0.05)] to-[hsl(var(--temple-gold)/0.05)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="pl-3">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-saffron" />
                  <h3 className="text-base font-display font-semibold text-foreground">
                    Spiritual Advice
                  </h3>
                </div>
                <p className="text-sm font-body text-foreground leading-relaxed italic">
                  &quot;{horoscope.advice}&quot;
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="text-center py-5 px-5">
        <p className="text-[10px] font-body text-muted-foreground italic">
          &quot;ज्योतिषं ब्रह्म विद्यानाम्&quot; — Astrology is the eye of the Vedas
        </p>
        <div className="section-ornament mt-2">
          <span className="text-temple-gold text-xs">🙏</span>
        </div>
      </div>
    </div>
  )
}

export default Horoscope
