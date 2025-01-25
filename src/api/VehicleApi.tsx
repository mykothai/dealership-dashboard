import axios, { AxiosResponse } from 'axios'
import instance from './axiosConfig'

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