import './LoginPage.css'
import { MdOutlineEmail } from 'react-icons/md'

export default function LoginPage() {
  return (
    <>
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <MdOutlineEmail className="icon" />
            <input type="text" placeholder="email" required />
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
