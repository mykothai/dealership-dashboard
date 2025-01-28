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
        height: '180px',
        margin: '10px 30px',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <p>Sales by Car Year</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData.length ? formattedData : [{ year: '', count: 0 }]}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="year"  />
          <YAxis dataKey="count"  allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
