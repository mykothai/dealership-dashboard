import { Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts'
import { CHART_COLORS } from '@constants'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'
import { Typography } from '@mui/material'
import NoDataMessage from '@components/NoDataAvailable'

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
        Sales by Condition
      </h3>

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
    </div>
  )
}
