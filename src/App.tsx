import LoginPage from '@components/Login/LoginPage'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <LoginPage />
    </>
  )
}

export default App
