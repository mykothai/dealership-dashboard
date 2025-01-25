import { UserRole } from '../constants'
import NotFound from './NotFoundPage'
import SaleDashboard from './Sales/SaleDashboard'
import UserDashboard from './Users/UserDashboard'
import VehicleDashboard from './Vehicles/VehicleDashboard'

export default function LandingPage({ session }) {
  const Dashboard = ({ userRole }: { userRole: string }) => {
    switch (userRole) {
      case UserRole.PRINCIPAL || UserRole.MANAGER:
        return <SaleDashboard session={session} />
      case UserRole.ADMIN:
        return <UserDashboard session={session} />
      case UserRole.SALES_REP:
        return <VehicleDashboard session={session} />
      default:
        return <NotFound />
    }
  }

  return (
    <>
      <Dashboard userRole={session.role} />
    </>
  )
}
