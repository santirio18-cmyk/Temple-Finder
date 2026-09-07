import { useState } from 'react'
import { ArrowLeft, Heart, Calendar, Clock, MapPin, Sparkles, User, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { calculateCompatibility, type PersonDetails, type CompatibilityResult } from '@/services/compatibilityService'

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
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [error, setError] = useState<string>('')

  const handleCalculate = async () => {
    if (!maleDetails.date || !maleDetails.time || !femaleDetails.date || !femaleDetails.time) {
      setError('Please fill all required fields (Date and Time for both)')
      return
    }

    setCalculating(true)
    setError('')
    
    try {
      // Use REAL Vedic astrology calculations
      const maleData: PersonDetails = {
        date: maleDetails.date,
        time: maleDetails.time,
        place: maleDetails.place || 'Chennai'
      }
      
      const femaleData: PersonDetails = {
        date: femaleDetails.date,
        time: femaleDetails.time,
        place: femaleDetails.place || 'Chennai'
      }
      
      const compatibility = calculateCompatibility(maleData, femaleData)
      setResult(compatibility)
    } catch (err: any) {
      setError(err.message || 'Error calculating compatibility')
    } finally {
      setCalculating(false)
    }
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
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm font-body text-red-600">
            {error}
          </div>
        )}
        
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
              {/* Source Badge */}
              <div className="bg-white rounded-lg p-2 mb-4 border border-[hsl(var(--temple-gold)/0.2)] shadow-sm">
                <p className="text-[10px] font-body text-foreground/70 text-center">
                  📚 <span className="font-semibold">Source:</span> {result.source}
                </p>
                <p className="text-[9px] font-body text-foreground/60 text-center mt-0.5">
                  Traditional Vedic Astrology • Verified Calculations
                </p>
              </div>

              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-3 gradient-saffron shadow-temple">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-saffron mb-1">
                  {result.recommendation}
                </h2>
                <p className="text-xs font-body text-foreground/70">Based on Ashtakoot Guna Milan</p>
              </div>

              {/* Rasi & Nakshatra Info - Beautiful Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Male */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-[hsl(var(--saffron)/0.05)] p-4 border border-[hsl(var(--saffron)/0.3)] shadow-card-warm">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[hsl(var(--saffron)/0.1)] to-transparent rounded-bl-full" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-display font-bold text-saffron">Male</h3>
                    </div>
                    <div className="space-y-2.5">
                      <div className="bg-white/80 rounded-lg p-2 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Star className="w-3.5 h-3.5 text-saffron" />
                          <p className="text-[10px] font-body font-semibold text-foreground/70 uppercase tracking-wide">Rasi</p>
                        </div>
                        <p className="text-sm font-display font-bold text-foreground">{result.male.moonSign}</p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-2 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-temple-gold" />
                          <p className="text-[10px] font-body font-semibold text-foreground/70 uppercase tracking-wide">Nakshatra</p>
                        </div>
                        <p className="text-sm font-display font-bold text-foreground">{result.male.nakshatra}</p>
                        <p className="text-[10px] font-body text-foreground/60 mt-0.5">Pada {result.male.pada}/4</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Female */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-[hsl(var(--temple-gold)/0.05)] p-4 border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[hsl(var(--temple-gold)/0.1)] to-transparent rounded-bl-full" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))] flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-display font-bold text-temple-gold">Female</h3>
                    </div>
                    <div className="space-y-2.5">
                      <div className="bg-white/80 rounded-lg p-2 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Star className="w-3.5 h-3.5 text-temple-gold" />
                          <p className="text-[10px] font-body font-semibold text-foreground/70 uppercase tracking-wide">Rasi</p>
                        </div>
                        <p className="text-sm font-display font-bold text-foreground">{result.female.moonSign}</p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-2 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-saffron" />
                          <p className="text-[10px] font-body font-semibold text-foreground/70 uppercase tracking-wide">Nakshatra</p>
                        </div>
                        <p className="text-sm font-display font-bold text-foreground">{result.female.nakshatra}</p>
                        <p className="text-[10px] font-body text-foreground/60 mt-0.5">Pada {result.female.pada}/4</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                  Guna Breakdown (Ashtakoot)
                </h3>
                {result.gunas.map((guna, index) => (
                  <div key={index} className="py-2 border-b border-border/30 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-body font-semibold text-foreground/80">{guna.name}</span>
                      <span className="text-sm font-semibold font-body text-foreground">
                        {guna.score}/{guna.max}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[hsl(var(--temple-gold)/0.2)] rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full gradient-saffron rounded-full transition-all"
                        style={{ width: `${(guna.score / guna.max) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-body text-foreground/60">{guna.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Info */}
            <div className="bg-gradient-to-r from-[hsl(var(--saffron)/0.05)] to-[hsl(var(--temple-gold)/0.05)] rounded-xl p-3 border border-[hsl(var(--temple-gold)/0.2)] mb-4">
              <p className="text-xs font-display font-bold text-saffron mb-2">✓ How to Verify Results:</p>
              <ul className="space-y-1 text-[10px] font-body text-foreground/70">
                <li>• Check Rasi & Nakshatra with any Vedic astrology website</li>
                <li>• Compare with traditional astrologer calculations</li>
                <li>• Use birth time & place for accurate results</li>
                <li>• Guna scores follow standard Ashtakoot rules</li>
              </ul>
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
