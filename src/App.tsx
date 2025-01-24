import LoginPage from '@components/Login/LoginPage'
import { getAllUsers } from './api/UserApi'
import { useState } from 'react'
import LandingPage from '@components/LandingPage'
import { UserRole } from './constants'

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: UserRole
  profile_picture_url: string
}

function App() {
  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  async function getUsers(email: string) {
    // call data base to get user by email
    try {
      const users = await getAllUsers().then((res) => res.data) || [] 
      const currentUser = users.filter((user: User) => user.email === email)[0]

      if (!currentUser) {
        alert('Unable to log in')
        return
      }

      setUsers(users)
      setLoggedInUser(currentUser)
    } catch (error) {
      console.error('Failed to retrieve inventory.', error)
    }
  }

  return (
    <>
      <LoginPage getUsers={getUsers} />
      {loggedInUser && <LandingPage session={loggedInUser} users={users} />}
    </>
  )
}

export default App
