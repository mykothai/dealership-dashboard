import { Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts'
import { PIE_CHART_COLORS } from '@constants'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'

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
        Sales by Make
      </h3>

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
                fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
              />
            ))}
            <Tooltip />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
