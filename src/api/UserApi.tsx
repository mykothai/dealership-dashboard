import axios, { AxiosResponse } from 'axios'
import instance from './axiosConfig'
import { User } from '@components/Users/UserDashboard'

export async function getAllUsers(): Promise<AxiosResponse> {
  try {
    return await instance.get('/users/all')
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error retrieving users. ${err}`)
    }
  }
}

export async function updateUserById(
  id: number,
  payload: Partial<User>
): Promise<AxiosResponse> {
  try {
    const apiUrl = `/users/user/${id}`

    return await instance.put(apiUrl, payload)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    } else {
      throw new Error(`There was an error updating user. ${err}`)
    }
  }
}
