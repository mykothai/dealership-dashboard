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
  const [loggedInUser, setLoggedInUser] = useState(null)
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
      setLoggedInUser(currentUser)
    } catch (error) {
      console.error('Failed to retrieve user.', error)
    }
  }

  return (
    <div className="flex">
      <Router>
        {loggedInUser && <SidebarMenu session={loggedInUser} />}
        <Routes>
          <Route
            path=""
            element={<LoginPage getUsers={getUsers} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/home"
            element={loggedInUser && <LandingPage session={loggedInUser} />}
          />
          <Route
            path="/sales"
            element={<SaleDashboard session={loggedInUser} />}
          />
          <Route
            path="/user"
            element={<UserDashboard session={loggedInUser} />}
          />
          <Route
            path="/vehicles"
            element={<VehicleDashboard session={loggedInUser} />}
          />

          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
