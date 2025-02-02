import { useNavigate } from 'react-router-dom'
import './SideMenu.css'
import { useEffect, useState } from 'react'
import { User } from '@components/Dashboards/Users'
import { Button } from '@mui/material'
import './SideMenu.css'
import { menuOptions } from '@constants'

export default function SidebarMenu({ handleLogout }) {
  const [session, setSession] = useState<User | null>(null)
  const [activePath, setActivePath] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const savedSession = localStorage.getItem('session')
    if (savedSession) {
      setSession(JSON.parse(savedSession))
    }
  }, [])

  const availableOptions = session ? menuOptions[session.role] : []

  function handleNavigation(path: string) {
    setActivePath(path)
    navigate(path)
  }

  function onLogout() {
    handleLogout()
  }

  return (
    <>
      <div className="sidebar">
        <nav className="content">
          {availableOptions.map((option) => (
            <Button
              className={`items ${
                activePath === option.path ? 'active' : 'dormant'
              }`}
              key={option.path}
              onClick={() => handleNavigation(option.path)}
            >
              {option.label}
            </Button>
          ))}
          <div className="logout">
            <Button
              className="logout button"
              onClick={() => {
                onLogout()
                navigate('/')
              }}
            >
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}
