// Simple App - No contexts, no complex services, just simple React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SimpleHome from './pages/SimpleHome'
import SimpleSearch from './pages/SimpleSearch'
import SimpleTemple from './pages/SimpleTemple'
import SimpleNearby from './pages/SimpleNearby'
import SimpleCategories from './pages/SimpleCategories'

function SimpleApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleHome />} />
        <Route path="/search" element={<SimpleSearch />} />
        <Route path="/temple/:id" element={<SimpleTemple />} />
        <Route path="/nearby" element={<SimpleNearby />} />
        <Route path="/categories" element={<SimpleCategories />} />
      </Routes>
    </Router>
  )
}

export default SimpleApp
