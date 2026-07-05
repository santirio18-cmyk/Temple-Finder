import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProfileModal from '../components/ProfileModal'
import { getUpcomingFestivals, type Festival } from '@/services/festivalService'

const SimpleFestivals: React.FC = () => {
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)
  const [festivals, setFestivals] = useState<Festival[]>([])

  useEffect(() => {
    const upcoming = getUpcomingFestivals()
    setFestivals(upcoming)
  }, [])

  return (
    <div className="min-h-screen bg-darshanam-beige">
      <PageHeader
        title="Festivals & Tithi"
        onBack={() => navigate('/')}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="text-lg font-bold text-darshanam-brown mb-2">Upcoming Sacred Days</h2>
          <p className="text-sm text-darshanam-brown-light">
            Important Hindu festivals and auspicious dates for temple visits
          </p>
        </div>

        <div className="space-y-4">
          {festivals.map((festival, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{festival.icon}</span>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-darshanam-brown mb-1">
                    {festival.name}
                  </h3>
                  <p className="text-sm text-darshanam-brown-light mb-3">
                    {festival.description}
                  </p>
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📅</span>
                      <span className="text-sm font-medium text-darshanam-brown">
                        {festival.date}
                      </span>
                    </div>
                    
                    <div className="px-3 py-1 bg-orange-50 border border-darshanam-orange rounded-full">
                      <span className="text-xs font-medium text-darshanam-orange">
                        {festival.daysLeft} {festival.daysLeft === 1 ? 'day' : 'days'} left
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {festivals.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-darshanam-brown mb-2">No Upcoming Festivals</h3>
            <p className="text-darshanam-brown-light">Check back soon for festival updates</p>
          </div>
        )}
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default SimpleFestivals
