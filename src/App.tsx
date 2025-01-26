import LoginPage from '@components/Login/LoginPage'
import LandingPage from '@components/LandingPage'
import NotFoundPage from '@components/NotFoundPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { getAllUsers } from './api/UserApi'
import UserDashboard, { User } from '@components/Users/UserDashboard'
import SidebarMenu from '@components/Menu/SideMenu'
import SaleDashboard from '@components/Sales/SaleDashboard'
import VehicleDashboard from '@components/Vehicles/VehicleDashboard'

function App() {
  // use user's email validated against existing users as a 'token'
  const [session, setSession] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function getUsers(email: string) {
    // call data base to get user by email
    try {
      const users = (await getAllUsers().then((res) => res.data)) || []
      const currentUser = users.filter((user: User) => user.email === email)[0]

      if (!currentUser) {
        alert('Unable to log in')
        return
      }

      setIsLoggedIn(true)
      setSession(currentUser)
    } catch (error) {
      console.error('Failed to retrieve user.', error)
    }
  }

  return (
    <div className="flex">
      <Router>
        {session && <SidebarMenu session={session} />}
        <Routes>
          <Route
            path=""
            element={<LoginPage getUsers={getUsers} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/"
            element={session && <LandingPage session={session} />}
          />
          <Route path="/sales" element={<SaleDashboard session={session} />} />
          <Route path="/users" element={<UserDashboard session={session} />} />
          <Route
            path="/vehicles"
            element={<VehicleDashboard session={session} />}
          />

          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
