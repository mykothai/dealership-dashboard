import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User } from '@components/Dashboards/Users'
import { Button, IconButton, Tooltip } from '@mui/material'
import { MENU_OPTIONS } from '@constants'
import { TbLogout } from 'react-icons/tb'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave'
import './SideMenu.css'

export default function SidebarMenu({ handleLogout }) {
  const [session, setSession] = useState<User | null>(null)
  const [activePath, setActivePath] = useState<string>('')
  const navigate = useNavigate()

  const iconMapping: Record<string, (isActive: boolean) => JSX.Element> = {
    Sales: (isActive) => (
      <RequestQuoteIcon
        className="sidebar-icons"
        sx={{
          color: isActive ? '#FFF' : '#5865f2', // Active vs Inactive color
        }}
      />
    ),
    Users: (isActive) => (
      <PeopleAltIcon
        className="sidebar-icons"
        sx={{
          color: isActive ? '#FFF' : '#5865f2',
        }}
      />
    ),
    Vehicles: (isActive) => (
      <TimeToLeaveIcon
        className="sidebar-icons"
        sx={{
          color: isActive ? '#FFF' : '#5865f2',
        }}
      />
    ),
  }

  useEffect(() => {
    const savedSession = localStorage.getItem('session')
    if (savedSession) {
      setSession(JSON.parse(savedSession))
    }
  }, [])

  const availableOptions = session ? MENU_OPTIONS[session.role] : []

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
          {availableOptions.map((option) => {
            const isActive = activePath === option.path // Check if this path is active
            return (
              <Button
                className={`sidebar-items ${isActive ? 'active' : 'dormant'}`}
                key={option.path}
                onClick={() => handleNavigation(option.path)}
              >
                {/* Render the icon with active/inactive state */}
                {iconMapping[option.label]?.(isActive) || null}
                {option.label}
              </Button>
            )
          })}
          <div className="logout">
            <Tooltip title="Log out">
              <IconButton
                size="large"
                onClick={() => {
                  onLogout()
                  navigate('/')
                }}
                color="inherit"
                sx={{
                  '&:hover': {
                    background: '#5865f2',
                    color: 'white',
                  },
                }}
              >
                <TbLogout />
              </IconButton>
            </Tooltip>
          </div>
        </nav>
      </div>
    </>
  )
}
