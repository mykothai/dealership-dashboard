import { useEffect, useState } from 'react'
import { deleteSale, getAllSales } from '@api/SalesApi'
import { UserRole } from '@constants'
import SalesTable from '@components/Tables/SalesTable'

import { User } from '@components/Dashboards/Users'
import { toast } from 'react-toastify'
import SalesAggregate from '@components/SalesAnalytics/SalesAggregate'
import SalesByCarYear from '@components/SalesAnalytics/SalesByCarAge'
import SalesByCondition from '@components/SalesAnalytics/SalesByCondition'
import SalesByDateChart from '@components/SalesAnalytics/SalesByDate'
import SalesByMake from '@components/SalesAnalytics/SalesByMake'
import SalesByPrice from '@components/SalesAnalytics/SalesByPrice'
import SalesByMileage from '@components/SalesAnalytics/SalesByMileage'
import Loading from '@components/Loading/loading'

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
  const [loading, setLoading] = useState(false)

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
      setLoading(true)

      const sales = (await getAllSales().then((res) => res.data)) || []
      // if the user is a sales-rep they are only allowed to see their own sales
      if (session && session.role === UserRole.SALES_REP) {
        sales.filter((sale: SalesData) => sale.sales_rep.id === session.id)
      }
      setSales(sales)
    } catch (error) {
      toast.error(`Failed to retrieve sales. Please refresh the page.`)
      console.error('Failed to retrieve sales.', error)
    } finally {
      setLoading(false)
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
      {loading ? (
        <Loading />
      ) : (
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
              <SalesByMileage salesData={sales} />
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
      )}
    </>
  )
}
