import { Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts'
import { CHART_COLORS } from '@constants'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'
import { Card, Typography } from '@mui/material'
import NoDataMessage from '@components/Status/NoDataAvailable'

interface Props {
  salesData: SalesData[]
}

export default function SalesByCondition({ salesData }: Props) {
  const salesByMetric = useMemo(() => {
    return salesData.reduce((acc, sale) => {
      acc[sale.vehicle.condition] = (acc[sale.vehicle.condition] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [salesData])

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(
    ([condition, count]) => ({
      condition,
      count,
    })
  )

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        margin: '10px',
        padding: '10px',
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
        Sales by Condition
      </Typography>

      {formattedData.length ? (
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="count"
              nameKey="condition"
              outerRadius={60}
              fill="#ff8042"
              label={({ condition }) => `${condition}`}
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
