import { useNavigate } from 'react-router-dom'
import './SideMenu.css'
import { useState } from 'react'

export default function SidebarMenu({ session }) {
  const [activePath, setActivePath] = useState<string>('')
  const navigate = useNavigate()

  interface MenuOption {
    label: string
    path: string
  }

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
  const availableOptions = menuOptions[session.role] || []

  function handleNavigation(path: string) {
    setActivePath(path)
    navigate(path)
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
        </nav>
      </div>
    </>
  )
}
