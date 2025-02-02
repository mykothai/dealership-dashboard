import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { User } from '@components/Dashboards/Users'
import { useNavigate } from 'react-router-dom'
import { TbLogout } from 'react-icons/tb'
import { MENU_OPTIONS } from '@constants'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined'
import './TopAppBar.css'

export default function TopAppBar({ handleLogout }) {
  const [session, setSession] = React.useState<User | null>(null)
  const [activePath, setActivePath] = React.useState<string>('')

  const navigate = useNavigate()

  const iconMapping: Record<string, JSX.Element> = {
    Sales: <RequestQuoteIcon sx={{ fontSize: 'x-large', color: '#FFF' }} />,
    Users: <PeopleAltIcon sx={{ fontSize: 'x-large', color: '#FFF' }} />,
    Vehicles: (
      <TimeToLeaveOutlinedIcon sx={{ fontSize: 'x-large', color: '#FFF' }} />
    ),
  }

  React.useEffect(() => {
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
    <AppBar>
      <Container maxWidth="xl" className="topbar">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            {availableOptions.map((option) => (
              <Button
                className={`items ${
                  activePath === option.path ? 'active' : 'dormant'
                }`}
                key={option.path}
                onClick={() => handleNavigation(option.path)}
              >
                {iconMapping[option.label] || null}
                {option.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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
                    background: '#2c2f33',
                  },
                }}
              >
                <TbLogout />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
