export enum VehicleCondition {
  NEW = 'NEW',
  USED = 'USED',
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  PRINCIPAL = 'principal',
  SALES_REP = 'sales-rep',
}

export type UserRoleType = 'principal' | 'admin' | 'manager' | 'sales-rep'

export enum VehicleStatus {
  IN_STOCK = 'in-stock',
  SOLD = 'sold',
}

export const urlHeaders = ['photo_url', 'profile_picture_url']

export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export enum Dashboards {
  SALES = 'Sales',
  USERS = 'Users',
  VEHICLES = 'Vehicles',
}

interface MenuOption {
  label: string
  path: string
}

export const menuOptions: { [key: string]: MenuOption[] } = {
  principal: [
    { label: `${Dashboards.SALES}`, path: '/sales' },
    { label: `${Dashboards.USERS}`, path: '/users' },
    { label: `${Dashboards.VEHICLES}`, path: '/vehicles' },
  ],
  admin: [
    { label: `${Dashboards.USERS}`, path: '/users' },
    { label: `${Dashboards.VEHICLES}`, path: '/vehicles' },
  ],
  manager: [
    { label: `${Dashboards.SALES}`, path: '/sales' },
    { label: `${Dashboards.VEHICLES}`, path: '/vehicles' },
  ],
  'sales-rep': [
    { label: `${Dashboards.SALES}`, path: '/sales' },
    { label: `${Dashboards.VEHICLES}`, path: '/vehicles' },
  ],
}
