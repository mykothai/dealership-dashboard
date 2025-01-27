import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts'
import { SalesData } from './SaleDashboard'
import { useMemo } from 'react'

interface Props {
  salesData: SalesData[]
}

export default function SalesByMileage({ salesData }: Props) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      const mileageRange = Math.floor(sale.vehicle.mileage / 10000) * 10
      const rangeLabel = `${mileageRange}-${mileageRange + 9}k`
      acc[rangeLabel] = (acc[rangeLabel] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [salesData])

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(
    ([milage, count]) => ({
      milage,
      count,
    })
  )

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
      <p>Sales by Mileage</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="milage" stroke="#fff" />
          <YAxis dataKey="count" stroke="#fff" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8dd1e1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
