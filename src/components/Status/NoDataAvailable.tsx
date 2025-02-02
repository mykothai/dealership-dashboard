import { Typography } from '@mui/material'

interface NoDataMessageProps {
  message?: string
}

export default function NoDataMessage({
  message = 'No data available.',
}: NoDataMessageProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '20px',
      }}
    >
      <Typography
        variant="body1"
        style={{
          color: '#6c757d',
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
    </div>
  )
}
