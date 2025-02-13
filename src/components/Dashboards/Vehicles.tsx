import { VehicleCondition } from '@constants'
import { useState, useEffect } from 'react'
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  updateVehicle,
} from '@api/VehicleApi'
import DataTable from '@components/Tables/DataTable'
import { sellVehicle } from '@api/SalesApi'
import { toast } from 'react-toastify'
import { Sale } from './Sales'
import Loading from '@components/Status/Loading'

export interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  vin: string
  condition: VehicleCondition
  mileage: number
  status: string
  photo_url: string
}

export default function VehicleDashboard() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)

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
    try {
      setLoading(true)

      const vehicles = (await getAllVehicles().then((res) => res.data)) || []
      setVehicles(vehicles)
    } catch (error) {
      toast.error(`Failed to retrieve vehicles. Please refresh the page.`)
      console.error('Failed to retrieve vehicles.', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(row: Record<string, any>) {
    try {
      const payload: Partial<Vehicle> = {
        make: row.make,
        model: row.model,
        year: parseInt(row.year),
        price: parseInt(row.price),
        vin: row.vin,
        condition: row.condition,
        mileage: parseInt(row.mileage),
        status: row.status,
        photo_url: row.photo_url,
      }

      const response = await createVehicle(payload)

      if (response.status === 201) {
        toast.success('Vehicle created successfully!')
        getVehicles()
      } else {
        throw new Error(response.status.toString())
      }
    } catch (error) {
      toast.error(`Failed to create new vehicle. Please try again.`)
      console.error('Failed to create vehicle.', error)
    }
  }

  async function handleSale(row: Record<string, any>) {
    try {
      const payload: Sale = {
        user: row.user,
        vehicle: row.vehicle,
        selling_price: row.selling_price,
        date: row.date,
      }

      const response = await sellVehicle(payload)
      if (response.status === 200) {
        toast.success('Vehicle sold successfully!')
        getVehicles()
      } else {
        throw new Error(response.status.toString())
      }
    } catch (error) {
      toast.error(`Failed to sell vehicle. Please try again.`)
      console.error('Failed to sell vehicle.', error)
    }
  }

  async function handleEdit(row: Vehicle) {
    try {
      const payload: Partial<Vehicle> = {
        make: row.make,
        model: row.model,
        year: row.year,
        price: row.price,
        vin: row.vin,
        condition: row.condition,
        mileage: row.mileage,
        status: row.status,
        photo_url: row.photo_url,
      }

      const response = await updateVehicle(row.id, payload)
      if (response.status === 202) {
        toast.success('Vehicle updated successfully!')
        getVehicles()
      } else {
        throw new Error(response.status.toString())
      }
    } catch (error) {
      toast.error(`Failed to update vehicle ${row.id}. Please try again.`)
      console.error('Failed to update vehicle.', error)
    }
  }

  async function handleDelete(row: Vehicle) {
    try {
      if (window.confirm('Are you sure you want to delete this vehicle?')) {
        const response = await deleteVehicle(row.id)

        if (response.status === 201) {
          toast.success('Vehicle deleted successfully!')
          getVehicles()
        } else {
          throw new Error(response.status.toString())
        }
      }
    } catch (error) {
      toast.error(`Failed to delete vehicle ${row.id}. Please try again.`)
      console.error(`Failed to delete vehicle ${row.id}`, error)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <DataTable
          title={'Vehicle Inventory'}
          headers={headers}
          data={vehicles}
          onAdd={handleCreate}
          onSale={handleSale}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}
