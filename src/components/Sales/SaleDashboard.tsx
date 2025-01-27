import { useEffect, useState } from 'react'
import { deleteSale, getAllSales } from '../../api/SalesApi'
import { UserRole } from '../../constants'
import SalesTable from '@components/Table/SalesTable'
import SalesByDateChart from './SalesByDate'
import SalesAggregate from './SalesAggregate'
import SalesByCarYear from './SalesByCarAge'
import SalesByCondition from './SalesByCondition'
import SalesByMake from './SalesByMake'
import SalesByMilage from './SalesByMileage'
import SalesByPrice from './SalesByPrice'
import { User } from '@components/Users/UserDashboard'
import { toast } from 'react-toastify'

export interface Sale {
  user: number
  vehicle: number
  selling_price: number
  date?: string
}

export interface SalesData {
  id: number
  sales_rep: {
    id: number
    first_name: string
    last_name: string
    email: string
    role: string
    profile_picture_url: string
  }
  vehicle: {
    id: number
    make: string
    model: string
    year: number
    price: number
    vin: string
    condition: string
    mileage: number
    status: string
    photo_url: string
  }
  selling_price: number
  date: string
}

export default function SaleDashboard() {
  const [session, setSession] = useState<User | null>(null)
  const [sales, setSales] = useState([])

  useEffect(() => {
    getSession()
    getSales()
  }, [])

  function getSession() {
    const savedSession = localStorage.getItem('session')
    if (savedSession) {
      setSession(JSON.parse(savedSession))
    }
  }

  async function getSales() {
    try {
      const sales = (await getAllSales().then((res) => res.data)) || []
      // if the user is a sales-rep they are only allowed to see their own sales
      if (session && session.role === UserRole.SALES_REP) {
        sales.filter((sale: SalesData) => sale.sales_rep.id === session.id)
      }
      setSales(sales)
    } catch (error) {
      toast.error(`Failed to retrieve sales. Please refresh the page.`)
      console.error('Failed to retrieve sales.', error)
    }
  }

  async function handleDelete(id: number) {
    try {
      if (window.confirm('Are you sure you want to delete this sale?')) {
        const response = await deleteSale(id)

        if (response.status === 200) {
          toast.success('Sale deleted successfully!')

          getSales()
        } else {
          throw new Error(response.status.toString())
        }
      }
    } catch (error) {
      console.error(`Failed to delete sale ${id}`, error)

      console.error(`Failed to delete sale ${id}`, error)
    }
  }

  return (
    <>
      <div
        style={{
          marginLeft: '200px',
          top: ' 0',
          bottom: ' 0',
          left: ' 0',
          position: 'fixed',
        }}
      >
        <div>
          <h1 style={{ justifyContent: 'left', margin: '10px 20px 20px' }}>
            Summary
          </h1>
          <SalesAggregate data={sales} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <SalesByDateChart salesData={sales} />
            <SalesByCarYear salesData={sales} />
            <SalesByCondition salesData={sales} />
            <SalesByMilage salesData={sales} />
            <SalesByPrice salesData={sales} />
            <SalesByMake salesData={sales} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 2fr)',
            marginTop: '20px',
            maxHeight: '50%',
          }}
        >
          <h1 style={{ justifyContent: 'left', margin: '10px 20px' }}>
            All Sales
          </h1>
          <div
            style={{
              overflowX: 'hidden',
              overflowY: 'scroll',
            }}
          >
            <SalesTable data={sales} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  )
}
