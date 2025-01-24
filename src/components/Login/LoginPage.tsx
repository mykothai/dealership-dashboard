import { useState } from 'react'
import './LoginPage.css'
import { MdOutlineEmail } from 'react-icons/md'
import { Navigate } from 'react-router-dom'

export default function LoginPage({ getUsers, isLoggedIn }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    getUsers(email)
    setEmail('') // Clear the input field
  }

  if (isLoggedIn) {
    return <Navigate to="/home" />
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
              onChange={(e) => setEmail(e.target.value)}
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
