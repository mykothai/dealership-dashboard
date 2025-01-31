import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'

interface Props {
  salesData: SalesData[]
}

export default function SalesByCarYear({ salesData }: Props) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      acc[sale.vehicle.year] = (acc[sale.vehicle.year] || 0) + 1
      return acc
    }, {} as Record<number, number>)
  }, [salesData])

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(([year, count]) => ({
    year,
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
        width: '100%',
      }}
    >
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>
        Sales by Model Year
      </h3>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={
            formattedData.length
              ? formattedData
              : [{ year: new Date().toLocaleDateString(), count: 0 }]
          }
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <YAxis dataKey="count" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
