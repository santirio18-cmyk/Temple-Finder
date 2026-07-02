import { useState } from 'react'
import HeaderSection from '@/components/HeaderSection'
import SacredToday from '@/components/SacredToday'
import DeityOfTheDay from '@/components/DeityOfTheDay'
import NearbyTemples from '@/components/NearbyTemples'
import DeitySection from '@/components/DeitySection'
import FestivalsSection from '@/components/FestivalsSection'
import ProfileModal from '@/components/ProfileModal'

const HomePage = () => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="min-h-screen relative">
      <HeaderSection onProfileClick={() => setShowProfile(true)} />
      <DeityOfTheDay />
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
