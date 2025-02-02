import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'
import { CHART_COLORS } from '@constants'
import NoDataMessage from '@components/Status/NoDataAvailable'
import { Card, Typography } from '@mui/material'

interface SalesByDateChartProps {
  salesData: SalesData[]
}

export default function SalesByDateChart({ salesData }: SalesByDateChartProps) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      const date = new Date(sale.date).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [salesData])

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(([date, count]) => ({
    date,
    count,
  }))

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        margin: '10px 30px',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Typography
        variant="subtitle2"
        component="div"
        align="center"
        color="gray"
        margin={'8px 0'}
      >
        Sales by Date
      </Typography>

      {formattedData.length ? (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={
              formattedData.length
                ? formattedData
                : [{ date: new Date().toLocaleDateString(), count: 0 }]
            }
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis dataKey="count" allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS[0]}
              strokeWidth={2}
              dot={{ strokeWidth: 5, r: 1.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <NoDataMessage />
      )}
    </Card>
  )
}
