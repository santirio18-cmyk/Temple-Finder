import { useState } from 'react'
import { ArrowLeft, Heart, Calendar, Clock, MapPin, Sparkles, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BirthDetails {
  date: string
  time: string
  place: string
}

const MarriageCompatibility = () => {
  const navigate = useNavigate()
  const [maleDetails, setMaleDetails] = useState<BirthDetails>({
    date: '',
    time: '',
    place: ''
  })
  const [femaleDetails, setFemaleDetails] = useState<BirthDetails>({
    date: '',
    time: '',
    place: ''
  })
  const [result, setResult] = useState<any>(null)
  const [calculating, setCalculating] = useState(false)

  const handleCalculate = async () => {
    if (!maleDetails.date || !maleDetails.time || !femaleDetails.date || !femaleDetails.time) {
      alert('Please fill all required fields (Date and Time for both)')
      return
    }

    setCalculating(true)
    
    // Simulate calculation
    setTimeout(() => {
      const score = Math.floor(Math.random() * 12) + 24 // Random score between 24-36
      setResult({
        totalScore: score,
        maxScore: 36,
        percentage: Math.round((score / 36) * 100),
        recommendation: score >= 28 ? 'Excellent Match' : score >= 24 ? 'Good Match' : 'Average Match',
        details: [
          { name: 'Varna (Status)', score: Math.min(1, Math.floor(Math.random() * 2)), max: 1 },
          { name: 'Vashya (Dominance)', score: Math.min(2, Math.floor(Math.random() * 3)), max: 2 },
          { name: 'Tara (Birth Star)', score: Math.min(3, Math.floor(Math.random() * 4)), max: 3 },
          { name: 'Yoni (Nature)', score: Math.min(4, Math.floor(Math.random() * 5)), max: 4 },
          { name: 'Graha Maitri (Friendship)', score: Math.min(5, Math.floor(Math.random() * 6)), max: 5 },
          { name: 'Gana (Temperament)', score: Math.min(6, Math.floor(Math.random() * 7)), max: 6 },
          { name: 'Bhakoot (Love)', score: Math.min(7, Math.floor(Math.random() * 8)), max: 7 },
          { name: 'Nadi (Health)', score: Math.min(8, Math.floor(Math.random() * 9)), max: 8 }
        ]
      })
      setCalculating(false)
    }, 1500)
  }

  const handleReset = () => {
    setMaleDetails({ date: '', time: '', place: '' })
    setFemaleDetails({ date: '', time: '', place: '' })
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 gradient-saffron-header text-white shadow-temple">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-5 h-5" />
              <h1 className="text-lg font-display font-bold">Marriage Compatibility</h1>
            </div>
            <p className="text-xs text-white/90 font-body">Kundli Matching - 36 Guna Milan</p>
          </div>
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {!result ? (
          <>
            {/* Male Details */}
            <div className="bg-card rounded-2xl p-4 border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm">
              <h2 className="text-base font-display font-bold text-saffron mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--saffron)/0.1)] to-[hsl(var(--temple-gold)/0.1)] flex items-center justify-center border border-[hsl(var(--saffron)/0.3)]">
                  <User className="w-5 h-5 text-saffron" />
                </div>
                Male Details
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground/80 mb-2">
                    <Calendar className="w-4 h-4 text-saffron" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={maleDetails.date}
                    onChange={(e) => setMaleDetails({ ...maleDetails, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-saffron focus:outline-none focus:ring-2 focus:ring-[hsl(var(--saffron)/0.2)] transition-all font-body bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground/80 mb-2">
                    <Clock className="w-4 h-4 text-saffron" />
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    value={maleDetails.time}
                    onChange={(e) => setMaleDetails({ ...maleDetails, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-saffron focus:outline-none focus:ring-2 focus:ring-[hsl(var(--saffron)/0.2)] transition-all font-body bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground/80 mb-2">
                    <MapPin className="w-4 h-4 text-saffron" />
                    Place of Birth (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chennai, Tamil Nadu"
                    value={maleDetails.place}
                    onChange={(e) => setMaleDetails({ ...maleDetails, place: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-saffron focus:outline-none focus:ring-2 focus:ring-[hsl(var(--saffron)/0.2)] transition-all font-body bg-background placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Female Details */}
            <div className="bg-card rounded-2xl p-4 border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm">
              <h2 className="text-base font-display font-bold text-temple-gold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--temple-gold)/0.1)] to-[hsl(var(--saffron-light)/0.1)] flex items-center justify-center border border-[hsl(var(--temple-gold)/0.3)]">
                  <User className="w-5 h-5 text-temple-gold" />
                </div>
                Female Details
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground/80 mb-2">
                    <Calendar className="w-4 h-4 text-temple-gold" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={femaleDetails.date}
                    onChange={(e) => setFemaleDetails({ ...femaleDetails, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-temple-gold focus:outline-none focus:ring-2 focus:ring-[hsl(var(--temple-gold)/0.2)] transition-all font-body bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground/80 mb-2">
                    <Clock className="w-4 h-4 text-temple-gold" />
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    value={femaleDetails.time}
                    onChange={(e) => setFemaleDetails({ ...femaleDetails, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-temple-gold focus:outline-none focus:ring-2 focus:ring-[hsl(var(--temple-gold)/0.2)] transition-all font-body bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-body font-semibold text-foreground/80 mb-2">
                    <MapPin className="w-4 h-4 text-temple-gold" />
                    Place of Birth (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chennai, Tamil Nadu"
                    value={femaleDetails.place}
                    onChange={(e) => setFemaleDetails({ ...femaleDetails, place: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-temple-gold focus:outline-none focus:ring-2 focus:ring-[hsl(var(--temple-gold)/0.2)] transition-all font-body bg-background placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={calculating}
              className="w-full py-4 rounded-2xl font-body text-base font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-temple gradient-saffron"
            >
              {calculating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Calculate Compatibility
                </span>
              )}
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="bg-gradient-to-br from-[hsl(var(--warm-cream))] to-[hsl(var(--warm-beige))] rounded-2xl p-6 border border-[hsl(var(--temple-gold)/0.3)] shadow-temple">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💑</div>
                <h2 className="text-2xl font-display font-bold text-saffron mb-2">
                  {result.recommendation}
                </h2>
                <p className="text-sm font-body text-foreground/70">Based on Ashtakoot Guna Milan</p>
              </div>

              {/* Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="hsl(var(--temple-gold) / 0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.totalScore / result.maxScore)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--saffron))" />
                        <stop offset="100%" stopColor="hsl(var(--temple-gold))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold font-display text-saffron">{result.totalScore}</div>
                    <div className="text-sm font-body text-foreground/60">out of {result.maxScore}</div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="inline-block px-6 py-2 bg-white rounded-full shadow-card-warm border border-[hsl(var(--temple-gold)/0.3)]">
                  <span className="text-2xl font-bold font-display text-saffron">{result.percentage}%</span>
                  <span className="text-sm font-body text-foreground/70 ml-2">Compatible</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-xl p-4 space-y-2 border border-[hsl(var(--temple-gold)/0.2)] shadow-card-warm">
                <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-saffron" />
                  Guna Breakdown
                </h3>
                {result.details.map((guna: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-sm font-body text-foreground/80">{guna.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[hsl(var(--temple-gold)/0.2)] rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-saffron rounded-full transition-all"
                          style={{ width: `${(guna.score / guna.max) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold font-body text-foreground min-w-[3rem] text-right">
                        {guna.score}/{guna.max}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleReset}
                className="py-3 rounded-xl font-body text-sm font-semibold border-2 border-saffron text-saffron hover:bg-[hsl(var(--saffron)/0.05)] transition-colors"
              >
                New Match
              </button>
              <button
                onClick={() => navigate('/kundli')}
                className="py-3 rounded-xl font-body text-sm font-semibold gradient-saffron text-white hover:opacity-90 transition-opacity shadow-card-warm"
              >
                View Kundli
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MarriageCompatibility
