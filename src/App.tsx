import LoginPage from '@components/Login/LoginPage'
import NotFoundPage from '@components/NotFoundPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllUsers } from './api/UserApi'
import UserDashboard, { User } from '@components/Users/UserDashboard'
import SidebarMenu from '@components/Menu/SideMenu'
import SaleDashboard from '@components/Sales/SaleDashboard'
import VehicleDashboard from '@components/Vehicles/VehicleDashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // use user's email validated against existing users as a 'token'
  const [session, setSession] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const savedSession = localStorage.getItem('session')
    if (savedSession) {
      setSession(JSON.parse(savedSession))
      setIsLoggedIn(true)
    }
  }, [])

  async function getUsers(email: string) {
    // call data base to get user by email
    try {
      const users = (await getAllUsers().then((res) => res.data)) || []
      const currentUser = users.filter((user: User) => user.email === email)[0]

      if (!currentUser) {
        alert('Unable to log in')
        return
      }

      const savedSession = localStorage.getItem('session')
      if (savedSession) {
        setSession(JSON.parse(savedSession))
      } else {
        localStorage.setItem('session', JSON.stringify(currentUser))
      }

      setIsLoggedIn(true)
    } catch (error) {
      console.error('Failed to retrieve user.', error)
    }
  }

  function handleLogout() {
    localStorage.removeItem('session')
    setSession(null)
    setIsLoggedIn(false)
  }

  return (
    <div className="flex">
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        {isLoggedIn && <SidebarMenu handleLogout={handleLogout} />}
        <Routes>
          <Route
            path=""
            element={<LoginPage getUsers={getUsers} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/sales" element={<SaleDashboard />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/vehicles" element={<VehicleDashboard />} />

          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
