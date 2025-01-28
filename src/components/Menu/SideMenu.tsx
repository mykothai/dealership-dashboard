import { useNavigate } from 'react-router-dom'
import './SideMenu.css'
import { useEffect, useState } from 'react'
import { User } from '@components/Dashboards/Users'
import { Button } from '@mui/material'
import './SideMenu.css'

interface MenuOption {
  label: string
  path: string
}

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

  // Define the menu options based on the role
  const menuOptions: { [key: string]: MenuOption[] } = {
    principal: [
      { label: 'Sales Dashboard', path: '/sales' },
      { label: 'User Dashboard', path: '/users' },
      { label: 'Vehicle Dashboard', path: '/vehicles' },
    ],
    admin: [
      { label: 'User Dashboard', path: '/users' },
      { label: 'Vehicle Dashboard', path: '/vehicles' },
    ],
    manager: [
      { label: 'Sales Dashboard', path: '/sales' },
      { label: 'Vehicle Dashboard', path: '/vehicles' },
    ],
    'sales-rep': [
      { label: 'Sales Dashboard', path: '/sales' },
      { label: 'Vehicle Dashboard', path: '/vehicles' },
    ],
  }

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
            <button
              className={`items ${activePath === option.path ? 'active' : ''}`}
              key={option.path}
              onClick={() => handleNavigation(option.path)}
            >
              {option.label}
            </button>
          ))}
          <div className="logout">
            <Button className="logout-button"
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
