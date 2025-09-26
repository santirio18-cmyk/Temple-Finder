import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import Header from './Header'

const Layout: React.FC = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {!isAuthPage && <Header />}
      
      <main className={`${!isAuthPage ? 'pb-20' : ''}`}>
        <Outlet />
      </main>
      
      {!isAuthPage && <BottomNavigation />}
    </div>
  )
}

export default Layout
