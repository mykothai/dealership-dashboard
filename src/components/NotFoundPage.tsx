import { useNavigate } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import { Button } from '@mui/material'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="wrapper">
      <TbError404 className="not-found" />
      <div className="text-center">
        <p>Oops! The page you are looking for could not be found.</p>
        <Button className="back button" onClick={() => navigate('/')}>Go Back</Button>
      </div>
    </div>
  )
}
