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
  DialogContent,
  DialogTitle,
  Button,
  TablePagination,
  TableSortLabel,
} from '@mui/material'
import { SalesData } from '@components/Sales/SaleDashboard'
import { MdDeleteForever } from 'react-icons/md'
import { formatCurrency, getComparator } from '../../helpers'
import { styled } from '@mui/material/styles'
import './DataTable.css'

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

  // FIXME: sorting not working on some columns
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
    <div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>
                <TableSortLabel
                  active={sortColumn === 'date'}
                  direction={sortColumn === 'date' ? sortDirection : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <TableSortLabel
                  active={sortColumn === 'vehicle.make'}
                  direction={
                    sortColumn === 'vehicle.make' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('vehicle.make')}
                >
                  Vehicle
                </TableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <TableSortLabel
                  active={sortColumn === 'selling_price'}
                  direction={
                    sortColumn === 'selling_price' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('selling_price')}
                >
                  Selling Price
                </TableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <TableSortLabel
                  active={sortColumn === 'profit'}
                  direction={sortColumn === 'profit' ? sortDirection : 'asc'}
                  onClick={() => handleSort('profit')}
                >
                  Profit
                </TableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
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
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>Delete</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row) => (
                <StyledTableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: 'pointer' }}
                >
                  <StyledTableCell>
                    {new Date(row.date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell>{`${row.vehicle.year} ${row.vehicle.make} ${row.vehicle.model}`}</StyledTableCell>
                  <StyledTableCell>{`${formatCurrency(
                    row.selling_price
                  )}`}</StyledTableCell>
                  <StyledTableCell>{`${formatCurrency(
                    row.selling_price - row.vehicle.price
                  )}`}</StyledTableCell>
                  <StyledTableCell>{`${row.sales_rep.first_name} ${row.sales_rep.last_name}`}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(row.id)
                      }}
                    >
                      <MdDeleteForever className="action-icon" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  rowSpan={4}
                  className="empty-table"
                  style={{
                    color: 'white',
                    borderBottom: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
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
          position: 'sticky',
          left: 0,
          bottom: 0,
          zIndex: 2,
          backgroundColor: '#465362',
        }}
      />

      <Dialog
        aria-modal
        open={!!selectedRow}
        onClose={handleCloseDetails}
        slotProps={{ paper: { style: { maxWidth: '500px' } } }}
        className="modal"
      >
        <StyledDialogTitle>Sale Details</StyledDialogTitle>
        <StyledDialogContent>
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
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton className="close" onClick={handleCloseDetails}>
            Close
          </StyledButton>
        </StyledDialogActions>
      </Dialog>
    </div>
  )
}

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#465362',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#6B747F',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#011936 !important',
  },
}))

const StyledTableCell = styled(TableCell)(() => ({
  color: 'white',
  borderBottom: 'none',
}))

const StyledTableHeaderCell = styled(TableCell)(() => ({
  backgroundColor: '#E68E22',
  fontWeight: 'bold',
  borderBottom: 'none',
  color: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 1,
}))

const StyledDialogTitle = styled(DialogTitle)(() => ({
  color: 'white',
  backgroundColor: '#465362',
}))

const StyledDialogContent = styled(DialogContent)(() => ({
  color: 'white',
  backgroundColor: '#465362',
}))

const StyledDialogActions = styled(DialogContent)(() => ({
  color: 'white',
  backgroundColor: '#465362',
}))

const StyledButton = styled(Button)(() => ({
  color: 'white',
  backgroundColor: '#E68E22',
  cursor: 'pointer',
}))
