import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import HeaderSection from '@/components/HeaderSection'
import SacredToday from '@/components/SacredToday'
import DeityOfTheDay from '@/components/DeityOfTheDay'
import NearbyTemples from '@/components/NearbyTemples'
import DeitySection from '@/components/DeitySection'
import FestivalsSection from '@/components/FestivalsSection'
import ProfileModal from '@/components/ProfileModal'

const HomePage = () => {
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative">
      <HeaderSection onProfileClick={() => setShowProfile(true)} />
      <DeityOfTheDay />
      
      {/* Birth Chart Link */}
      <div className="px-3 mb-4">
        <button
          type="button"
          onClick={() => navigate('/kundli')}
          className="w-full bg-gradient-to-br from-[hsl(var(--saffron)/0.05)] to-[hsl(var(--temple-gold)/0.05)] rounded-xl border border-[hsl(var(--temple-gold)/0.3)] shadow-card-warm p-4 hover:shadow-temple transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--saffron-light))] flex items-center justify-center text-white shadow-temple">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-base font-display font-bold text-foreground">
                Birth Chart (Kundli)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get your complete Vedic birth chart with planetary positions
              </p>
            </div>
            <span className="text-saffron text-lg">→</span>
          </div>
        </button>
      </div>
      
      <SacredToday />
      <NearbyTemples />
      <DeitySection />
      <FestivalsSection />

      <div className="text-center py-5 px-5">
        <p className="text-[10px] font-body text-muted-foreground italic">
          &quot;सर्वे भवन्तु सुखिनः&quot; — May all beings be happy
        </p>
        <div className="section-ornament mt-2">
          <span className="text-temple-gold text-xs">🙏</span>
        </div>
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default HomePage
