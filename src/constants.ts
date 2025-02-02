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

export const CHART_COLORS = [
  '#5865F2',
  '#00C49F',
  '#9996F5',
  '#F6AE2D',
  '#F2545B',
  '#2C2F33',
]

export enum Dashboards {
  SALES = 'Sales',
  USERS = 'Users',
  VEHICLES = 'Vehicles',
}

interface MenuOption {
  label: string
  path: string
}

export const MENU_OPTIONS: { [key: string]: MenuOption[] } = {
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