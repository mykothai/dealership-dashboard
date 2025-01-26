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
