import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import BottomTabs from './components/BottomTabs'
import SimpleHome from './pages/SimpleHome'
import SimpleSearch from './pages/SimpleSearch'
import SimpleTemple from './pages/SimpleTemple'
import SimpleNearby from './pages/SimpleNearby'
import SimpleCategories from './pages/SimpleCategories'

function SimpleApp() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-background max-w-lg mx-auto relative pb-24">
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/search" element={<SimpleSearch />} />
            <Route path="/temple/:id" element={<SimpleTemple />} />
            <Route path="/nearby" element={<SimpleNearby />} />
            <Route path="/categories" element={<SimpleCategories />} />
          </Routes>
          <BottomTabs />
        </div>
      </Router>
    </UserProvider>
  )
}

export default SimpleApp
