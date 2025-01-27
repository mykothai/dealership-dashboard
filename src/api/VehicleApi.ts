import axios, { AxiosResponse } from 'axios'
import instance from './axiosConfig'
import { Vehicle } from '@components/Vehicles/VehicleDashboard'

export async function getAllVehicles(): Promise<AxiosResponse> {
  try {
    return await instance.get('/inventory/vehicles')
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error retrieving vehicles. ${err}`)
    }
  }
}

export async function createVehicle(
  payload: Partial<Vehicle>
): Promise<AxiosResponse> {
  try {
    return await instance.post('/inventory/vehicle', payload)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error adding a vehicle. ${err}`)
    }
  }
}

export async function updateVehicle(
  id: number,
  payload: Partial<Vehicle>
): Promise<AxiosResponse> {
  try {
    return await instance.put(`/inventory/vehicle/${id}`, payload)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error updating the vehicle. ${err}`)
    }
  }
}

export async function deleteVehicle(id: number): Promise<AxiosResponse> {
  try {
    return await instance.delete(`/inventory/vehicle/${id}`)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error deleting the vehicle. ${err}`)
    }
  }
}
