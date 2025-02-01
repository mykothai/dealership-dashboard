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
import NoDataMessage from '@components/NoDataAvailable'

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        margin: '10px 30px',
        overflow: 'hidden',
      }}
    >
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>
        Sales by Date
      </h3>

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
    </div>
  )
}
