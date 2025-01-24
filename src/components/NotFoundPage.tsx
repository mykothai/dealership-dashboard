import './NotFoundPage.css'
import { TbError404 } from 'react-icons/tb'

export default function NotFoundPage() {
  return (
    <div className="wrapper">
      <TbError404 className="not-found" />
      <div className="text-center">
        <p>Oops! The page you are looking for could not be found.</p>
        <button onClick={() => (window.location.href = '/')}>
          Go Back to the Login Screen
        </button>
      </div>
    </div>
  )
}
