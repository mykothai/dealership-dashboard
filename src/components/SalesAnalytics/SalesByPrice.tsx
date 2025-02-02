import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
} from 'recharts'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'
import { CHART_COLORS } from '@constants'
import { calculatePriceRange } from '@helpers'
import NoDataMessage from '@components/Status/NoDataAvailable'
import { Card, Typography } from '@mui/material'

interface Props {
  salesData: SalesData[]
}

export default function SalesByPrice({ salesData }: Props) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      const priceRange = calculatePriceRange(sale.vehicle.price)
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
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        padding: '10px',
        margin: '10px',
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
        Sales by Price
      </Typography>

      {formattedData.length ? (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="price" />
            <YAxis dataKey="count" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d">
              {formattedData.map((_entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % 20]} />
                )
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <NoDataMessage />
      )}
    </Card>
  )
}
