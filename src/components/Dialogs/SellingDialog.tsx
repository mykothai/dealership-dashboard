import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import './SellingDialog.css'

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
    <Dialog aria-modal className="modal" open={open} onClose={onCancel}>
      <DialogTitle>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          Sell Vehicle
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="User"
          fullWidth
          margin="dense"
          value={formData.user}
          onChange={(e) => handleChange('user', e.target.value)}
        />
        <TextField
          label="Vehicle"
          fullWidth
          margin="dense"
          value={formData.vehicle}
          onChange={(e) => handleChange('vehicle', e.target.value)}
          disabled
        />
        <TextField
          label="Selling Price"
          fullWidth
          margin="dense"
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
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
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
