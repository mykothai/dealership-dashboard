import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'
import { CHART_COLORS } from '@constants'
import NoDataMessage from '@components/NoDataAvailable'

interface Props {
  salesData: SalesData[]
}

export default function SalesByModelYear({ salesData }: Props) {
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
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        margin: '10px 30px',
        overflow: 'hidden',
      }}
    >
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>
        Sales by Model Year
      </h3>

      {formattedData.length ? (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={
              formattedData.length
                ? formattedData
                : [{ year: new Date().toLocaleDateString(), count: 0 }]
            }
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="year" />
            <YAxis dataKey="count" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d">
              {formattedData.map((entry, index) => {
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
    </div>
  )
}
