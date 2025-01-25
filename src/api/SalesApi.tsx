import axios, { AxiosResponse } from 'axios'
import instance from './axiosConfig'
import { Sale } from '@components/Sales/SaleDashboard'

export async function getAllSales(): Promise<AxiosResponse> {
  try {
    return await instance.get('/sales/all')
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error retrieving sales. ${err}`)
    }
  }
}

export async function sellVehicle(payload: Sale): Promise<AxiosResponse> {
  try {
    return await instance.post(
      `/sales/sale?user=${payload.user}&vehicle=${payload.vehicle}&selling_price=${payload.selling_price}&date=${payload.date}`
    )
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error creating a sale. ${err}`)
    }
  }
}

export async function deleteSale(id: number): Promise<AxiosResponse> {
  try {
    return await instance.delete(`/sales/sale/${id}`)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error deleting the sale. ${err}`)
    }
  }
}
