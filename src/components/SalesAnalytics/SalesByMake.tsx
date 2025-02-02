import { Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts'
import { CHART_COLORS } from '@constants'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'
import NoDataMessage from '@components/Status/NoDataAvailable'
import { Card, Typography } from '@mui/material'

interface Props {
  salesData: SalesData[]
}

export default function SalesByMake({ salesData }: Props) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      acc[sale.vehicle.make] = (acc[sale.vehicle.make] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [salesData])

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(([make, count]) => ({
    make,
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
        Sales by Make
      </Typography>

      {formattedData.length ? (
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="count"
              nameKey="make"
              outerRadius={60}
              fill="#ffc658"
              label={({ make }) => `${make}`}
              labelLine={false}
            >
              {formattedData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <NoDataMessage />
      )}
    </Card>
  )
}
