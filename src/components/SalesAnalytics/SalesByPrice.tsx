import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'

interface Props {
  salesData: SalesData[]
}

export default function SalesByPrice({ salesData }: Props) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      const priceRange = Math.floor(sale.vehicle.price / 10000) * 10
      const priceLabel = `${priceRange}-${priceRange + 9}k`
      acc[priceLabel] = (acc[priceLabel] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [salesData])

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(([price, count]) => ({
    price,
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
      <p>Sales by Price</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="price"  />
          <YAxis dataKey="count"  allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8dd1e1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
