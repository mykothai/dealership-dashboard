function descendingComparator<Key extends keyof any>(
  a: any,
  b: any,
  orderBy: Key
): number {
  // Default undefined values to null
  const aValue = a[orderBy] ?? null
  const bValue = b[orderBy] ?? null

  if (aValue === null && bValue === null) {
    return 0
  }
  if (aValue === null) {
    return 1 // null values are placed last
  }
  if (bValue === null) {
    return -1 // null values are placed last
  }

  // Check if values are number strings
  const isANumber = !isNaN(parseFloat(aValue)) && isFinite(aValue)
  const isBNumber = !isNaN(parseFloat(bValue)) && isFinite(bValue)

  // Handles floats like 24.500 and 6.50
  if (isANumber && isBNumber) {
    return parseFloat(bValue) - parseFloat(aValue)
  }

  // Compare numbers directly
  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return bValue - aValue
  }

  // Compare strings
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return bValue.localeCompare(aValue)
  }

  // Fallback to string comparison for other cases
  return bValue.toString().localeCompare(aValue.toString())
}

export function getComparator<Key extends keyof any>(
  order: string,
  orderBy: Key
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
