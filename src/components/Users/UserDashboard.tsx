import { UserRole } from '../../constants'

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: UserRole
  profile_picture_url: string
}

export default function UserDashboard({ session }) {
  return <></>
}
