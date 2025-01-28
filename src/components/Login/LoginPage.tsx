import { useState } from 'react'
import './LoginPage.css'
import { MdOutlineEmail } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import { UserRole } from '@constants'
import { Button } from '@mui/material'

export default function LoginPage({ getUsers, isLoggedIn }) {
  const [email, setEmail] = useState('')

  let session = null
  const savedSession = localStorage.getItem('session')
  if (savedSession) {
    session = JSON.parse(savedSession)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Since we don't have an auth server to verify credentials we'll use
    // the user's as a way to verify that a user exists in the system
    getUsers(email)
    setEmail('')
  }

  if (isLoggedIn && session) {
    switch (session.role) {
      case UserRole.PRINCIPAL || UserRole.MANAGER:
        return <Navigate to="/sales" />

      case UserRole.ADMIN:
        return <Navigate to="/users" />

      case UserRole.SALES_REP:
        return <Navigate to="/vehicles" />

      default:
        return <Navigate to="/404" />
    }
  }

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <MdOutlineEmail className="icon" />
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
            />
          </div>

          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  )
}
