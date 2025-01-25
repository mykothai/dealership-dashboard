import { VehicleStatus } from '../../constants'
import { useState, useEffect } from 'react'
import { getAllVehicles } from '../../api/VehicleApi'
import DataTable from '@components/Table/DataTable'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  vin: string
  condition: VehicleStatus
  mileage: number
  status: string
  photo_url: string
}

export default function VehicleDashboard({ session }) {
  const [vehicles, setVehicles] = useState([])

  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'photo_url', label: 'Photo' },
    { key: 'make', label: 'Make' },
    { key: 'model', label: 'Model' },
    { key: 'year', label: 'Year' },
    { key: 'price', label: 'Price' },
    { key: 'vin', label: 'VIN' },
    { key: 'condition', label: 'Condition' },
    { key: 'mileage', label: 'Mileage' },
    { key: 'status', label: 'Status' },
  ]

  useEffect(() => {
    getVehicles()
  }, [])

  async function getVehicles() {
    // call data base to get user by email
    try {
      const vehicles = (await getAllVehicles().then((res) => res.data)) || []
      setVehicles(vehicles)
    } catch (error) {
      console.error('Failed to retrieve vehicles.', error)
    }
  }

  function handleSale(row: Record<string, any>) {
    if (
      window.confirm(`Sell ${row.year} ${row.make} ${row.model} (${row.vin})`)
    ) {
      // TODO:
    }
  }

  function handleEdit(row: Record<string, any>) {
    // TODO:
  }

  function handleDelete(row: Record<string, any>) {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      // TODO:
    }
  }

  return (
    <>
      <DataTable
        headers={headers}
        data={vehicles}
        onSale={handleSale}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  )
}
