import { useState, useEffect } from 'react'
import { User, Calendar, Clock, MapPin, Plus, Trash2, Star, Moon, Sun, Edit2 } from 'lucide-react'
import {
  calculateBirthChart,
  saveBirthChart,
  getBirthCharts,
  deleteBirthChart,
  updateBirthChart,
  type BirthDetails,
  type BirthChart,
} from '@/services/kundliService'

const Kundli = () => {
  const [showForm, setShowForm] = useState(false)
  const [savedCharts, setSavedCharts] = useState<BirthChart[]>([])
  const [selectedChart, setSelectedChart] = useState<BirthChart | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  const [formData, setFormData] = useState<BirthDetails>({
    name: '',
    dateOfBirth: new Date(),
    timeOfBirth: '12:00',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 'Asia/Kolkata',
    locationName: 'Chennai, India'
  })

  useEffect(() => {
    const charts = getBirthCharts()
    setSavedCharts(charts)
    if (charts.length > 0 && !selectedChart) {
      setSelectedChart(charts[0])
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const chart = calculateBirthChart(formData)
    
    if (editingIndex !== null) {
      // Update existing chart
      updateBirthChart(editingIndex, chart)
      const updated = getBirthCharts()
      setSavedCharts(updated)
      setSelectedChart(updated[editingIndex])
      setEditingIndex(null)
    } else {
      // Create new chart
      saveBirthChart(chart)
      setSavedCharts([...savedCharts, chart])
      setSelectedChart(chart)
    }
    
    setShowForm(false)
    // Reset form
    setFormData({
      name: '',
      dateOfBirth: new Date(),
      timeOfBirth: '12:00',
      latitude: 13.0827,
      longitude: 80.2707,
      timezone: 'Asia/Kolkata',
      locationName: 'Chennai, India'
    })
  }

  const handleEdit = (index: number, chart: BirthChart) => {
    // Pre-fill form with chart data
    setFormData({
      name: chart.name,
      dateOfBirth: new Date(chart.birthDateTime),
      timeOfBirth: new Date(chart.birthDateTime).toTimeString().slice(0, 5),
      latitude: 13.0827, // Default for now
      longitude: 80.2707, // Default for now
      timezone: 'Asia/Kolkata',
      locationName: chart.location
    })
    setEditingIndex(index)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setShowForm(false)
    setEditingIndex(null)
    // Reset form
    setFormData({
      name: '',
      dateOfBirth: new Date(),
      timeOfBirth: '12:00',
      latitude: 13.0827,
      longitude: 80.2707,
      timezone: 'Asia/Kolkata',
      locationName: 'Chennai, India'
    })
  }

  const handleDelete = (index: number) => {
    deleteBirthChart(index)
    const updated = getBirthCharts()
    setSavedCharts(updated)
    if (selectedChart === savedCharts[index]) {
      setSelectedChart(updated[0] || null)
    }
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative pb-24">
      <div className="fixed inset-0 pointer-events-none overflow-hidden max-w-lg mx-auto">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='30' fill='none' stroke='%23C67D2A' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      <div className="text-center pt-6 pb-4 px-3">
        <div className="inline-flex items-center gap-2">
          <span className="text-lg">📜</span>
          <h1 className="text-2xl font-display font-bold text-shimmer-gold">
            Birth Chart (Kundli)
          </h1>
          <span className="text-lg">📜</span>
        </div>
        <div className="mx-auto mt-1.5 w-24 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--saffron))] to-transparent" />
        <p className="text-[11px] text-muted-foreground mt-2 px-4">
          Your complete Vedic birth chart with planetary positions
        </p>
      </div>

      {/* Saved Charts List */}
      <div className="px-3 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-semibold text-foreground px-1">
            Saved Charts
          </h3>
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null)
              setShowForm(!showForm)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] text-white text-xs font-body font-medium shadow-temple"
          >
            <Plus className="w-3.5 h-3.5" />
            New Chart
          </button>
        </div>

        {showForm && (
          <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-body font-semibold text-foreground">
                {editingIndex !== null ? 'Edit Birth Chart' : 'New Birth Chart'}
              </h4>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-body font-medium text-foreground block mb-1">
                  <User className="w-3 h-3 inline mr-1" />
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--temple-gold)/0.3)] text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="Enter name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-body font-medium text-foreground block mb-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Birth Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: new Date(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--temple-gold)/0.3)] text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>

                <div>
                  <label className="text-xs font-body font-medium text-foreground block mb-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Birth Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.timeOfBirth}
                    onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--temple-gold)/0.3)] text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-body font-medium text-foreground block mb-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Birth Place
                </label>
                <input
                  type="text"
                  required
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--temple-gold)/0.3)] text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="City, Country"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Using coordinates: {formData.latitude.toFixed(4)}°, {formData.longitude.toFixed(4)}°
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] text-white text-sm font-body font-medium shadow-temple"
                >
                  {editingIndex !== null ? 'Update Chart' : 'Calculate Chart'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded-lg border border-[hsl(var(--temple-gold)/0.3)] text-sm font-body font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {savedCharts.length === 0 && !showForm && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <p>No saved charts yet</p>
            <p className="text-xs mt-1">Create your first birth chart above</p>
          </div>
        )}

        {savedCharts.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            {savedCharts.map((chart, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedChart(chart)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  selectedChart === chart
                    ? 'bg-gradient-to-br from-[hsl(var(--saffron)/0.1)] to-[hsl(var(--temple-gold)/0.1)] border-2 border-saffron'
                    : 'bg-[hsl(30,40%,97%)] border border-[hsl(var(--temple-gold)/0.2)] hover:border-saffron'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-body font-semibold text-foreground">{chart.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {chart.birthDateTime.toLocaleDateString()} • {chart.location}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(index, chart)
                    }}
                    className="p-2 rounded-lg hover:bg-saffron/10 text-saffron"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(index)
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chart Display */}
      {selectedChart && (
        <>
          <div className="px-8 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--temple-gold)/0.25)] to-transparent" />
          </div>

          {/* Basic Info */}
          <div className="px-3 mb-4">
            <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="pl-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sun className="w-4 h-4 text-saffron" />
                      <p className="text-xs font-body font-semibold text-muted-foreground">
                        Ascendant (Lagna)
                      </p>
                    </div>
                    <p className="text-base font-display font-bold text-foreground">
                      {selectedChart.ascendant.sign}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedChart.ascendant.degree.toFixed(2)}°
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Moon className="w-4 h-4 text-saffron" />
                      <p className="text-xs font-body font-semibold text-muted-foreground">
                        Moon Sign
                      </p>
                    </div>
                    <p className="text-base font-display font-bold text-foreground">
                      {selectedChart.moonSign}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedChart.nakshatra.name}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sun className="w-4 h-4 text-saffron" />
                      <p className="text-xs font-body font-semibold text-muted-foreground">
                        Sun Sign
                      </p>
                    </div>
                    <p className="text-base font-display font-bold text-foreground">
                      {selectedChart.sunSign}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-saffron" />
                      <p className="text-xs font-body font-semibold text-muted-foreground">
                        Birth Nakshatra
                      </p>
                    </div>
                    <p className="text-sm font-body font-semibold text-foreground">
                      {selectedChart.nakshatra.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pada {selectedChart.nakshatra.pada} • Lord: {selectedChart.nakshatra.lord}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Planetary Positions */}
          <div className="px-3 mb-4">
            <div className="bg-[hsl(30,40%,97%)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="pl-3">
                <h3 className="text-base font-display font-semibold text-foreground mb-3">
                  Planetary Positions
                </h3>
                <div className="space-y-2">
                  {selectedChart.planets.map((planet, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-[hsl(var(--temple-gold)/0.2)] last:border-0">
                      <div>
                        <p className="text-sm font-body font-semibold text-foreground">
                          {planet.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          House {planet.house} • {planet.nakshatra}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-body font-semibold text-saffron">
                          {planet.sign}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {planet.degree.toFixed(2)}°
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vimshottari Dasha */}
          <div className="px-3 mb-4">
            <div className="bg-gradient-to-br from-[hsl(var(--saffron)/0.05)] to-[hsl(var(--temple-gold)/0.05)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-5 relative overflow-hidden">
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--saffron))] via-[hsl(var(--temple-gold))] to-[hsl(var(--saffron-light))]" />

              <div className="pl-3">
                <h3 className="text-base font-display font-semibold text-foreground mb-3">
                  Current Vimshottari Dasha
                </h3>
                <div className="bg-white/50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Maha Dasha</p>
                  <p className="text-lg font-display font-bold text-saffron">
                    {selectedChart.dasha.lord}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedChart.dasha.startDate.toLocaleDateString()} - {selectedChart.dasha.endDate.toLocaleDateString()}
                  </p>
                </div>

                <p className="text-xs font-body font-semibold text-foreground mb-2">Antar Dasha (Sub-periods)</p>
                <div className="space-y-2">
                  {selectedChart.dasha.subPeriods.map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <p className="font-body text-foreground">{sub.planet}</p>
                      <p className="text-muted-foreground">
                        {sub.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {sub.endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="text-center py-5 px-5">
        <p className="text-[10px] font-body text-muted-foreground italic">
          &quot;ज्योतिषं चक्षुः वेदानाम्&quot; — Astrology is the eye of the Vedas
        </p>
        <div className="section-ornament mt-2">
          <span className="text-temple-gold text-xs">🙏</span>
        </div>
      </div>
    </div>
  )
}

export default Kundli
