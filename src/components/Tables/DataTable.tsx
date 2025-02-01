import React, { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableSortLabel,
  Tooltip,
  Paper,
} from '@mui/material'
import { MdAdd, MdEdit } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md'
import { MdAttachMoney } from 'react-icons/md'
import { urlHeaders, VehicleStatus } from '@constants'
import { getComparator } from '@helpers'
import './DataTable.css'
import SellingDialog from '@components/Dialogs/SellingDialog'
import { styled } from '@mui/material/styles'
import OverflowTooltip from '@components/OverflowTooltip'
import NoDataMessage from '@components/NoDataAvailable'

interface Headers {
  key: string
  label: string
}

interface DataTableProps {
  headers: Headers[]
  data: Record<string, any>[]
  onDelete?: Record<string, any>
  onEdit?: Record<string, any>
  onAdd?: Record<string, any>
  onSale?: Record<string, any>
  rowsPerPage?: number
}

export default function DataTable({
  headers,
  data,
  onAdd,
  onSale,
  onEdit,
  onDelete,
}: DataTableProps) {
  const [searchParams, setSearchParams] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const [editRow, setEditRow] = useState<Record<string, any> | null>(null)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [addRow, setAddRow] = useState<Record<string, any> | null>(null)
  const [saleRow, setSaleRow] = useState<Record<string, any> | null>(null)

  function handleSort(columnKey: string) {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return data
    return [...data].sort(getComparator(sortDirection, sortColumn))
  }, [data, sortColumn, sortDirection])

  const filteredData = useMemo(() => {
    if (!searchParams) return sortedData

    return sortedData.filter((row) =>
      headers.some((header: { key: string | number }) =>
        row[header.key]
          ?.toString()
          .toLowerCase()
          .includes(searchParams.toLowerCase())
      )
    )
  }, [searchParams, sortedData, headers])

  const paginatedData = useMemo(() => {
    const start = currentPage * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, currentPage, rowsPerPage])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value)
    setCurrentPage(0)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  const handleEdit = (row) => {
    setEditRow(row)
  }

  const handleSaveEdit = () => {
    if (editRow && onEdit) {
      onEdit(editRow)
    }
    setEditRow(null)
  }

  const handleCancelEdit = () => {
    setEditRow(null)
  }

  const handleAdd = () => {
    const emptyRow = headers.reduce(
      (acc, header) => ({ ...acc, [header.key]: '' }),
      {}
    )
    setAddRow(emptyRow)
  }

  const handleSaveAdd = () => {
    if (addRow && onAdd) {
      onAdd(addRow)
    }
    setAddRow(null)
  }

  const handleCancelAdd = () => {
    setAddRow(null)
  }

  const handleSell = (row: Record<string, any>) => {
    setSaleRow({
      user: '',
      vehicle: row.id,
      selling_price: '',
      date: '',
    })
  }

  const handleSaveSale = (saleData: Record<string, any>) => {
    if (onSale) {
      onSale(saleData)
    }
    setSaleRow(null)
  }

  const handleCancelSale = () => {
    setSaleRow(null)
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        {onAdd && (
          <Button
            className="add button"
            variant="contained"
            size="small"
            startIcon={<MdAdd className="add icon" />}
            onClick={() => handleAdd()}
          >
            Add New Vehicle
          </Button>
        )}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchParams}
          onChange={handleSearch}
        />
      </div>
      <TableContainer
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <Table
          size="small"
          sx={{
            tableLayout: 'block',
            '@media (min-width: 800px)': { display: 'table' },
            minWidth: 420,
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  className="table-cell"
                  key={header.key}
                  sx={{
                    color: 'white',
                    width: 'auto',
                    minWidth: 100,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    '@media (max-width: 800px)': {
                      display: header.key === 'id' ? 'none' : 'table-cell',
                    },
                  }}
                >
                  <TableSortLabel
                    active={sortColumn === header.key}
                    direction={
                      sortColumn === header.key ? sortDirection : 'asc'
                    }
                    onClick={() => handleSort(header.key)}
                    sx={{
                      color: 'white',
                      '&:hover': { color: 'white' },
                      '&.Mui-active': { color: 'white' },
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                      },
                    }}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {onSale && (
                <TableCell className="table-cell" style={{ color: 'white' }}>
                  Sell
                </TableCell>
              )}
              {onEdit && (
                <TableCell className="table-cell" style={{ color: 'white' }}>
                  Edit
                </TableCell>
              )}
              {onDelete && (
                <TableCell className="table-cell" style={{ color: 'white' }}>
                  Delete
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  {headers.map((header) => (
                    <TableCell
                      key={header.key}
                      sx={{
                        width: 'auto',
                        minWidth: 100,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '@media (max-width: 800px)': {
                          display: header.key === 'id' ? 'none' : 'table-cell',
                        },
                      }}
                    >
                      {urlHeaders.includes(header.key) ? (
                        <img
                          src={row[header.key]}
                          width={60}
                          alt={row[header.key]}
                        />
                      ) : (
                        <OverflowTooltip
                          children={row[header.key]}
                        ></OverflowTooltip>
                      )}
                    </TableCell>
                  ))}
                  {onSale && (
                    <TableCell style={{ borderBottom: 'none' }}>
                      {row['status'] !== VehicleStatus.SOLD && (
                        <IconButton onClick={() => handleSell(row)}>
                          <MdAttachMoney className="action-icon" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}

                  {onEdit && (
                    <TableCell style={{ borderBottom: 'none' }}>
                      <IconButton onClick={() => handleEdit(row)}>
                        <MdEdit className="action-icon" />
                      </IconButton>
                    </TableCell>
                  )}

                  {onDelete && (
                    <TableCell style={{ borderBottom: 'none' }}>
                      {row['status'] !== VehicleStatus.SOLD && (
                        <IconButton onClick={() => onDelete(row)}>
                          <MdDeleteForever className="action-icon" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
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
                  <NoDataMessage message={'No Results'}/>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
      <Dialog
        aria-modal
        className="modal"
        open={!!editRow}
        onClose={handleCancelEdit}
      >
        <DialogTitle>Edit</DialogTitle>

        <DialogContent>
          {headers.map((header) => (
            <TextField
              key={header.key}
              label={header.label}
              fullWidth
              margin="dense"
              value={editRow?.[header.key] || ''}
              onChange={(e) =>
                setEditRow((prev) =>
                  prev ? { ...prev, [header.key]: e.target.value } : null
                )
              }
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button className="cancel" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        aria-modal
        className="modal"
        open={!!addRow}
        onClose={handleCancelEdit}
      >
        <DialogTitle>Add new vehicle</DialogTitle>

        <DialogContent>
          {headers.map(
            (header) =>
              header.key !== 'id' && (
                <TextField
                  key={header.key}
                  label={header.label}
                  fullWidth
                  margin="dense"
                  value={addRow?.[header.key] || ''}
                  onChange={(e) =>
                    setAddRow((prev) =>
                      prev ? { ...prev, [header.key]: e.target.value } : null
                    )
                  }
                />
              )
          )}
        </DialogContent>

        <DialogActions>
          <Button className="cancel" onClick={handleCancelAdd}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSaveAdd}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {saleRow && (
        <SellingDialog
          open={!!saleRow}
          saleData={saleRow}
          onCancel={handleCancelSale}
          onSave={handleSaveSale}
        />
      )}
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
