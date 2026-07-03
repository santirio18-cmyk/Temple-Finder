import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './contexts/UserContext'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import BottomTabs from './components/BottomTabs'
import HomePage from './pages/HomePage'
import SimpleSearch from './pages/SimpleSearch'
import SimpleTemple from './pages/SimpleTemple'
import SimpleNearby from './pages/SimpleNearby'
import SimpleCategories from './pages/SimpleCategories'
import Panchang from './pages/Panchang'
import Horoscope from './pages/Horoscope'
import Kundli from './pages/Kundli'
import Ritual from './pages/Ritual'
import OnboardingLogin from './pages/OnboardingLogin'
import OnboardingDeity from './pages/OnboardingDeity'
import OnboardingDifficulty from './pages/OnboardingDifficulty'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

function AppShell() {
  const location = useLocation()
  const hideTabs = location.pathname.startsWith('/onboarding')

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative pb-24">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SimpleSearch />} />
        <Route path="/temple/:id" element={<SimpleTemple />} />
        <Route path="/nearby" element={<SimpleNearby />} />
        <Route path="/categories" element={<SimpleCategories />} />
        <Route path="/panchang" element={<Panchang />} />
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/kundli" element={<Kundli />} />
        <Route path="/ritual" element={<Ritual />} />
        <Route path="/onboarding/login" element={<OnboardingLogin />} />
        <Route path="/onboarding/difficulty" element={<OnboardingDifficulty />} />
        <Route path="/onboarding/deity" element={<OnboardingDeity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideTabs && <BottomTabs />}
    </div>
  )
}

function SimpleApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AppShell />
          </Router>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default SimpleApp
