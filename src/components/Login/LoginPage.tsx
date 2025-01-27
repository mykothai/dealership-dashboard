import { useState } from 'react'
import './LoginPage.css'
import { MdOutlineEmail } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import { UserRole } from '../../constants'

export default function LoginPage({ getUsers, session, isLoggedIn }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Since we don't have an auth server to verify credentials we'll use
    // the user's as a way to verify that a user exists in the system
    getUsers(email)
    setEmail('')
  }

  if (isLoggedIn) {
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

          <button type="submit">Login</button>

          <div className="register">
            <p>
              Don't have an account? <a href="#">Contact your administrator</a>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}
