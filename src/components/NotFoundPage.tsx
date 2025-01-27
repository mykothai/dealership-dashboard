import { useNavigate } from 'react-router-dom'
import './NotFoundPage.css'
import { TbError404 } from 'react-icons/tb'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="wrapper">
      <TbError404 className="not-found" />
      <div className="text-center">
        <p>Oops! The page you are looking for could not be found.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    </div>
  )
}
