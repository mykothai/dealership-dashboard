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
  DialogActions,
} from '@mui/material'
import { MdDeleteForever } from 'react-icons/md'
import { formatCurrency, getComparator } from '@helpers'
import { styled } from '@mui/material/styles'
import { SalesData } from '@components/Dashboards/Sales'
import OverflowTooltip from '@components/OverflowTooltip'
import './SalesTable.css'

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
    <div>
      <TableContainer className='table-container'>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>
                <StyledTableSortLabel
                  active={sortColumn === 'date'}
                  direction={sortColumn === 'date' ? sortDirection : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </StyledTableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <StyledTableSortLabel
                  active={sortColumn === 'vehicle.make'}
                  direction={
                    sortColumn === 'vehicle.make' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('vehicle.make')}
                >
                  Vehicle
                </StyledTableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <StyledTableSortLabel
                  active={sortColumn === 'selling_price'}
                  direction={
                    sortColumn === 'selling_price' ? sortDirection : 'asc'
                  }
                  onClick={() => handleSort('selling_price')}
                >
                  Selling Price
                </StyledTableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <StyledTableSortLabel
                  active={sortColumn === 'profit'}
                  direction={sortColumn === 'profit' ? sortDirection : 'asc'}
                  onClick={() => handleSort('profit')}
                >
                  Profit
                </StyledTableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                <StyledTableSortLabel
                  active={sortColumn === 'sales_rep.first_name'}
                  direction={
                    sortColumn === 'sales_rep.first_name'
                      ? sortDirection
                      : 'asc'
                  }
                  onClick={() => handleSort('sales_rep.first_name')}
                >
                  Sales Rep
                </StyledTableSortLabel>
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
                    <OverflowTooltip
                      children={new Date(row.date).toLocaleDateString()}
                    ></OverflowTooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <OverflowTooltip
                      children={`${row.vehicle.year} ${row.vehicle.make} ${row.vehicle.model}`}
                    ></OverflowTooltip>
                  </StyledTableCell>

                  <StyledTableCell>
                    <OverflowTooltip
                      children={`${formatCurrency(row.selling_price)}`}
                    ></OverflowTooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <OverflowTooltip
                      children={`${formatCurrency(
                        row.selling_price - row.vehicle.price
                      )}`}
                    ></OverflowTooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <OverflowTooltip
                      children={`${row.sales_rep.first_name} ${row.sales_rep.last_name}`}
                    ></OverflowTooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(row.id)
                      }}
                    >
                      <MdDeleteForever />
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
          position: 'sticky',
          left: 0,
          bottom: 0,
          zIndex: 2,
        }}
      />

      <Dialog
        aria-modal
        open={!!selectedRow}
        onClose={handleCloseDetails}
        className="modal"
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
          <StyledButton className="close" onClick={handleCloseDetails}>
            Close
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#D5D6D7',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#ADD5FF !important',
  },
}))

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none',
  width: 'auto',
  minWidth: 100,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

const StyledTableHeaderCell = styled(TableCell)(() => ({
  backgroundColor: '#5865F2',
  color: 'white',
  fontWeight: 'bold',
  borderBottom: 'none',
  top: 0,
  zIndex: 1,
}))

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#5865F2',
  color: 'white',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#2c2f33',
  },
}))

const StyledTableSortLabel = styled(TableSortLabel)(() => ({
  color: 'white',
  '&:hover': { color: 'white' },
  '&.Mui-active': {
    color: 'white',
  },
  '& .MuiTableSortLabel-icon': {
    color: 'white !important',
  },
}))