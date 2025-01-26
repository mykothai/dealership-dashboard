import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'

export default function SellingDialog({ open, saleData, onCancel, onSave }) {
  const [formData, setFormData] = useState(saleData)

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <Dialog aria-modal open={open} onClose={onCancel}>
      <DialogTitle
        style={{
          color: 'white',
          backgroundColor: '#465362',
        }}
      >
        Sell Vehicle
      </DialogTitle>
      <DialogContent
        style={{
          color: 'white',
          backgroundColor: '#465362',
        }}
      >
        <TextField
          label="User"
          fullWidth
          margin="dense"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            htmlInput: { style: { color: 'white' } },
          }}
          value={formData.user}
          onChange={(e) => handleChange('user', e.target.value)}
        />
        <TextField
          label="Vehicle"
          fullWidth
          margin="dense"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            htmlInput: { style: { color: 'white' } },
          }}
          value={formData.vehicle}
          onChange={(e) => handleChange('vehicle', e.target.value)}
          disabled
        />
        <TextField
          label="Selling Price"
          fullWidth
          margin="dense"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            htmlInput: { style: { color: 'white' } },
          }}
          type="number"
          value={formData.selling_price}
          onChange={(e) =>
            handleChange('selling_price', parseFloat(e.target.value))
          }
        />
        <TextField
          label="Date"
          fullWidth
          margin="dense"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            htmlInput: { style: { color: 'white' } },
          }}
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />
      </DialogContent>
      <DialogActions
        style={{
          color: 'white',
          backgroundColor: '#465362',
        }}
      >
        <Button className="cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="save" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
