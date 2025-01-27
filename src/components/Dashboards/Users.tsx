import DataTable from '@components/Tables/DataTable'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllUsers, updateUserById } from '@api/UserApi'
import { UserRole } from '@constants'

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
      toast.error('Failed to retrieve users. Please refresh the page.')
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
        toast.success('User updated successfully!')
        getUsers()
      } else {
        throw new Error(response.status.toString())
      }
    } catch (error) {
      toast.error(`Failed to update user ${row.id}. Please try again.`)

      console.error('Failed to update user.', error)
    }
  }

  return (
    <>
      <DataTable headers={headers} data={users} onEdit={handleEdit} />
    </>
  )
}
