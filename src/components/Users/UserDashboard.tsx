import DataTable from '@components/Table/DataTable'
import { UserRole } from '../../constants'
import { getAllUsers, updateUserById } from '../../api/UserApi'
import { useEffect, useState } from 'react'

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: UserRole
  profile_picture_url: string
}

export default function UserDashboard() {
  const [users, setUsers] = useState([])

  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'profile_picture_url', label: 'Profile' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    try {
      const vehicles = (await getAllUsers().then((res) => res.data)) || []
      setUsers(vehicles)
    } catch (error) {
      console.error('Failed to retrieve users.', error)
    }
  }

  async function handleEdit(row: Record<string, any>) {
    try {
      const payload: Partial<User> = {
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        role: row.role,
        profile_picture_url: row.profile_picture_url,
      }

      const response = await updateUserById(parseInt(row.id), payload)
      if (response.status === 202) {
        getUsers()
      } else {
        throw new Error(response.status.toString())
      }
    } catch (error) {
      console.error('Failed to update user.', error)
    }
  }

  return (
    <>
      <DataTable headers={headers} data={users} onEdit={handleEdit} />
    </>
  )
}
