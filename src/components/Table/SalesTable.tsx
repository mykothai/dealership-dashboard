import { useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TablePagination,
  TableSortLabel,
} from '@mui/material'
import { SalesData } from '@components/Sales/SaleDashboard'
import { MdDeleteForever } from 'react-icons/md'
import './DataTable.css'
import { formatCurrency, getComparator } from '../../helpers'

interface SalesTableProps {
  data: SalesData[]
  onDelete: (id: number) => void
}

export default function SalesTable({ data, onDelete }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [selectedRow, setSelectedRow] = useState<SalesData | null>(null)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedData = useMemo(() => {
    if (!sortColumn) return data
    return [...data].sort(getComparator(sortDirection, sortColumn))
  }, [data, sortColumn, sortDirection])

  const paginatedData = useMemo(() => {
    const start = currentPage * rowsPerPage
    return sortedData.slice(start, start + rowsPerPage)
  }, [sortedData, currentPage, rowsPerPage])

  function handleSort(columnKey: string) {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleRowClick = (row: SalesData) => {
    setSelectedRow(row)
  }

  const handleCloseDetails = () => {
    setSelectedRow(null)
  }

  return (
    <div className="table-wrapper">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'date'}
                  direction={sortColumn === 'date' ? sortDirection : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'vehicle.make'}
                  direction={
                    sortColumn === 'vehicle.make' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('vehicle.make')}
                >
                  Vehicle
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'selling_price'}
                  direction={
                    sortColumn === 'selling_price' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('selling_price')}
                >
                  Selling Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'profit'}
                  direction={sortColumn === 'profit' ? sortDirection : 'asc'}
                  onClick={() => handleSort('profit')}
                >
                  Profit
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'sales_rep.first_name'}
                  direction={
                    sortColumn === 'sales_rep.first_name'
                      ? sortDirection
                      : 'asc'
                  }
                  onClick={() => handleSort('sales_rep.first_name')}
                >
                  Sales Rep
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell>{`${row.vehicle.year} ${row.vehicle.make} ${row.vehicle.model}`}</TableCell>
                <TableCell>{`${formatCurrency(row.selling_price)}`}</TableCell>
                <TableCell>{`${formatCurrency(
                  row.selling_price - row.vehicle.price
                )}`}</TableCell>
                <TableCell>{`${row.sales_rep.first_name} ${row.sales_rep.last_name}`}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(row.id)
                    }}
                  >
                    <MdDeleteForever className="action-icon" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[10, 25, 50, 100]}
        sx={{
          '.MuiTablePagination-selectIcon': { color: 'white' },
          '.MuiTablePagination-actions > button': { color: 'white' },
          '.MuiTablePagination-toolbar': { color: 'white' },
        }}
      />

      <Dialog
        aria-modal
        open={!!selectedRow}
        onClose={handleCloseDetails}
        slotProps={{ paper: { style: { padding: '16px', maxWidth: '500px' } } }}
      >
        <DialogTitle>Sale Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <p>
                <strong>Sales Rep:</strong>{' '}
                {`${selectedRow.sales_rep.first_name} ${selectedRow.sales_rep.last_name} (ID: ${selectedRow.sales_rep.id})`}
              </p>
              <p>
                <strong>Vehicle:</strong>{' '}
                {`${selectedRow.vehicle.year} ${selectedRow.vehicle.make} ${selectedRow.vehicle.model}`}
              </p>
              <p>
                <strong>Vehicle Price:</strong>{' '}
                {formatCurrency(selectedRow.vehicle.price)}
              </p>
              <p>
                <strong>Selling Price:</strong>{' '}
                {formatCurrency(selectedRow.selling_price)}
              </p>
              <p>
                <strong>Profit:</strong>{' '}
                {formatCurrency(
                  selectedRow.selling_price - selectedRow.vehicle.price
                )}
              </p>
              <p>
                <strong>Date Sold:</strong>{' '}
                {new Date(selectedRow.date).toLocaleDateString()}
              </p>
              <p>
                <strong>VIN:</strong> {selectedRow.vehicle.vin}
              </p>
              <p>
                <strong>Mileage:</strong>{' '}
                {selectedRow.vehicle.mileage.toLocaleString()} miles
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
