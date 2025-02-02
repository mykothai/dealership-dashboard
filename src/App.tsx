import LoginPage from '@components/Login/LoginPage'
import NotFoundPage from '@components/Status/NotFoundPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllUsers } from './api/UserApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SaleDashboard from '@components/Dashboards/Sales'
import UserDashboard, { User } from '@components/Dashboards/Users'
import VehicleDashboard from '@components/Dashboards/Vehicles'
import SidebarMenu from '@components/Menu/SideMenu'
import Loading from '@components/Status/Loading'
import TopAppBar from '@components/Menu/TopAppBar'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Figtree, serif',
        },
        h1: {
          display: 'flex',
          placeItems: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#5865f2',
        },
        h4: {
          textAlign: 'left',
          color: '#5865f2',
          fontWeight: 'bold',
          fontStyle: 'light',
        },
        h5: {
          textAlign: 'left',
          color: '#5865f2',
          fontWeight: 'bold',
          fontStyle: 'light',
        },
      },
    },
  },
})

function App() {
  // use user's email validated against existing users as a 'token'
  const [session, setSession] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      const users = (await getAllUsers().then((res) => res.data)) || []
      const currentUser = users.filter((user: User) => user.email === email)[0]

      if (!currentUser) {
        toast.error('Unable to log in. Please check your credentials.')
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
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('session')
    setSession(null)
    setIsLoggedIn(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="flex">
        <ToastContainer position="top-center" autoClose={2000} />
        <Router>
          {isLoggedIn && <SidebarMenu handleLogout={handleLogout} />}
          {isLoggedIn && <TopAppBar handleLogout={handleLogout} />}
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route
                path=""
                element={
                  <LoginPage getUsers={getUsers} isLoggedIn={isLoggedIn} />
                }
              />
              <Route path="/sales" element={<SaleDashboard />} />
              <Route path="/users" element={<UserDashboard />} />
              <Route path="/vehicles" element={<VehicleDashboard />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Routes>
          )}
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
