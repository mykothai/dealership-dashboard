import { Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts'
import { SalesData } from './SaleDashboard'
import { PIE_CHART_COLORS } from '../../constants'

interface Props {
  salesData: SalesData[]
}

export default function SalesByMake({ salesData }: Props) {
  const salesByMetric = salesData.reduce((acc, sale: SalesData) => {
    acc[sale.vehicle.make] = (acc[sale.vehicle.make] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // format data into proper object
  const formattedData = Object.entries(salesByMetric).map(([make, count]) => ({
    make,
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
      <p>Sales by Make</p>
      <ResponsiveContainer width="100%" height="100%">
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
