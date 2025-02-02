import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { User } from '@components/Dashboards/Users'
import { formatCurrency } from '@helpers'
import { useMemo } from 'react'
import { SalesData } from '@components/Dashboards/Sales'

interface SalesAggregateChartProps {
  data: SalesData[]
}

export default function SalesAggregate({ data }: SalesAggregateChartProps) {
  // Calculate total number of cars sold
  const totalCarsSold = data.length || 0

  // Calculate total profits
  const totalProfits = useMemo(() => {
    return data.reduce((total, sale) => total + sale.selling_price, 0)
  }, [data])

  // Calculate sales rep with the most sales
  const mostSalesRep = useMemo(() => {
    return getRepWithMostSales(data)
  }, [data])

  const repName = mostSalesRep
    ? `${mostSalesRep.first_name} ${mostSalesRep.last_name}`
    : ''

  // Calculate highest selling make
  const highestSellingMake = useMemo(() => {
    return getMakeWithMostSales(data)
  }, [data])

  // Cards data
  const cards = [
    {
      title: 'Total Cars Sold',
      metric: `${totalCarsSold}`,
    },
    {
      title: 'Total Profits',
      metric: `${formatCurrency(totalProfits)}`,
    },
    {
      title: 'Avg. Profit/Car',
      metric: totalCarsSold
        ? `${formatCurrency(totalProfits / totalCarsSold)}`
        : 0,
    },
    {
      title: 'Most Sales',
      metric: repName ? repName : '-',
    },
    {
      title: 'Best Selling Make',
      metric: highestSellingMake ? highestSellingMake : '-',
    },
  ]

  function getRepWithMostSales(data): User {
    const salesByRepIdMap = new Map()
    for (const sale of data) {
      if (salesByRepIdMap.has(sale.sales_rep.id)) {
        salesByRepIdMap.set(
          sale.sales_rep.id,
          salesByRepIdMap.get(sale.sales_rep.id) + 1
        )
      } else {
        salesByRepIdMap.set(sale.sales_rep.id, 1)
      }
    }

    let maxKey = null
    let maxValue = -Infinity

    for (const [key, value] of salesByRepIdMap.entries()) {
      if (value >= maxValue) {
        maxValue = value
        maxKey = key
      }
    }

    return data.find((sale) => sale.sales_rep.id === parseInt(maxKey))
      ?.sales_rep
  }

  function getMakeWithMostSales(data): string {
    const salesByMakeMap = new Map()
    for (const sale of data) {
      const make = sale.vehicle.make

      if (salesByMakeMap.has(make)) {
        salesByMakeMap.set(make, salesByMakeMap.get(make) + 1)
      } else {
        salesByMakeMap.set(make, 1)
      }
    }

    let maxKey = null
    let maxValue = -Infinity

    for (const [key, value] of salesByMakeMap.entries()) {
      if (value >= maxValue) {
        maxValue = value
        maxKey = key
      }
    }

    return data.find((sale) => sale.vehicle.make === maxKey)?.vehicle.make
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        alignItems: 'start',
        justifyItems: 'center',
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          sx={{
            width: 200,
            borderRadius: '10px',
            backgroundColor: '#FFF',
            margin: '10px',
          }}
        >
          <CardContent sx={{ height: '100%' }}>
            <Typography
              variant="caption"
              component="div"
              align="center"
              color="gray"
              margin={'8px 0'}
            >
              {card.title}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="#5865f2"
              fontWeight="bold"
            >
              {card.metric}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
