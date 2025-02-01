import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { SalesData } from '@components/Dashboards/Sales'
import { CHART_COLORS } from '@constants'
import { calculatePriceRange } from '@helpers'
import NoDataMessage from '@components/NoDataAvailable'

interface Props {
  salesData: SalesData[]
}

export default function SalesByAvgPriceOverTime({ salesData }: Props) {
  const formattedData = useMemo(() => {
    const dataByDate = salesData.reduce((acc, sale) => {
      const date = new Date(sale.date).toISOString().split('T')[0]
      const priceRange = Math.floor(sale.vehicle.price / 10000) * 10
      const priceLabel = `${priceRange}-${priceRange + 9}k`

      if (!acc[date]) {
        acc[date] = {}
      }

      if (!acc[date][priceLabel]) {
        acc[date][priceLabel] = { count: 0, totalPrice: 0 }
      }

      acc[date][priceLabel].count += 1
      acc[date][priceLabel].totalPrice += sale.vehicle.price

      return acc
    }, {} as Record<string, Record<string, { count: number; totalPrice: number }>>)

    const chartData = Object.entries(dataByDate).map(([date, priceBuckets]) => {
      const entry = { date }
      Object.entries(priceBuckets).forEach(
        ([priceLabel, { count, totalPrice }]) => {
          entry[priceLabel] = count ? totalPrice / count : 0 // average price per bucket
        }
      )
      return entry
    })

    return chartData
  }, [salesData])

  const priceBuckets = useMemo(() => {
    const buckets = new Set<string>()

    salesData.forEach((sale) => {
      const priceRange = calculatePriceRange(sale.vehicle.price)
      buckets.add(`${priceRange}-${priceRange + 9}k`)
    })
    return Array.from(buckets)
  }, [salesData])

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
        Average Sales by Price Over Time
      </h3>

      {formattedData.length ? (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            {priceBuckets.map((bucket, index) => (
              <Line
                key={bucket}
                type="monotone"
                dataKey={bucket}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2}
                dot={{ strokeWidth: 5, r: 1.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <NoDataMessage />
      )}
    </div>
  )
}
