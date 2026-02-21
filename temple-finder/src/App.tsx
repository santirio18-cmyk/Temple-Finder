import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SimpleTempleProvider } from './contexts/SimpleTempleContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import SearchPage from './pages/Search'
import TempleDetails from './pages/TempleDetails'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import Nearby from './pages/Nearby'
import NearbyDebug from './pages/NearbyDebug'
import Auth from './pages/Auth'
import Notifications from './pages/Notifications'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SimpleTempleProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-neutral-900 dark:to-neutral-800 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="temple/:id" element={<TempleDetails />} />
                <Route path="categories" element={<Categories />} />
                <Route path="profile" element={<Profile />} />
                <Route path="favorites" element={<Favorites />} />
                      <Route path="nearby" element={<Nearby />} />
                      <Route path="nearby-debug" element={<NearbyDebug />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="admin" element={<AdminDashboard />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
            </Routes>
            </div>
          </Router>
        </SimpleTempleProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
