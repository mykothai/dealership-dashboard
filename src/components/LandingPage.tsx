import { UserRole } from '../constants'
import NotFound from './NotFoundPage'
import SaleDashboard from './Sales/SaleDashboard'
import UserDashboard, { User } from './Users/UserDashboard'
import VehicleDashboard from './Vehicles/VehicleDashboard'

export default function LandingPage({ session }: { session: User }) {
  const Dashboard = ({ userRole }: { userRole: string }) => {
    switch (userRole) {
      case UserRole.PRINCIPAL || UserRole.MANAGER:
        return <SaleDashboard />
      case UserRole.ADMIN:
        return <UserDashboard />
      case UserRole.SALES_REP:
        return <VehicleDashboard />
      default:
        return <NotFound />
    }
  }

  return <>{<Dashboard userRole={session.role} />}</>
}
