import { useEffect, useState } from 'react'
import { deleteSale, getAllSales } from '../../api/SalesApi'
import { UserRole } from '../../constants'
import SalesTable from '@components/Table/SalesTable'

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

export default function SaleDashboard({ session }) {
  const [sales, setSales] = useState([])

  useEffect(() => {
    getSales()
  }, [])

  async function getSales() {
    try {
      const sales = (await getAllSales().then((res) => res.data)) || []
      // if the user is a sales-rep they are only allowed to see their own sales
      if (session.role === UserRole.SALES_REP) {
        sales.filter((sale: SalesData) => sale.sales_rep.id === session.id)
      }

      setSales(sales)
    } catch (error) {
      console.error('Failed to retrieve sales.', error)
    }
  }

  async function handleDelete(id: number) {
    try {
      if (window.confirm('Are you sure you want to delete this sale?')) {
        const response = await deleteSale(id)

        if (response.status === 200) {
          getSales()
        } else {
          throw new Error(response.status.toString())
        }
      }
    } catch (error) {
      console.error(`Failed to delete sale ${id}`, error)
    }
  }

  return (
    <>
      <SalesTable data={sales} onDelete={handleDelete} />
    </>
  )
}
