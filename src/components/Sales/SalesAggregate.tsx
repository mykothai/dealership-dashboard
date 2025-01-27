import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SalesData } from './SaleDashboard'
import { User } from '@components/Users/UserDashboard'
import { formatCurrency } from '../../helpers'

interface SalesAggregateChartProps {
  data: SalesData[]
}

export default function SalesAggregate({ data }: SalesAggregateChartProps) {
  // Calculate total number of cars sold
  const totalCarsSold = data.length || 0

  // Calculate total profits
  const totalProfits = data.reduce(
    (total, sale) => total + sale.selling_price,
    0
  )

  // Calculate sales rep with the most sales
  const mostSalesRep = getRepWithMostSales(data)
  const repName = mostSalesRep
    ? `${mostSalesRep.first_name} ${mostSalesRep.last_name}`
    : ''

  // Calculate highest selling make
  const highestSellingMake = getMakeWithMostSales(data)

  // Cards data
  const cards = [
    {
      title: 'Total Cars Sold',
      description: `${totalCarsSold}`,
    },
    {
      title: 'Total Profits',
      description: `${formatCurrency(totalProfits)}`,
    },
    {
      title: 'Most Sales',
      description: repName,
    },
    {
      title: 'Best Selling Make',
      description: highestSellingMake,
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
        gridTemplateColumns: 'auto auto auto auto',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          sx={{
            width: 200,
            height: '100%',
            borderRadius: '8px',
            backgroundColor: '#E68E22',
          }}
        >
          <CardContent sx={{ height: '100%' }}>
            <Typography
              variant="h6"
              component="div"
              align="center"
              color="white"
            >
              {card.title}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="black"
              fontWeight="bold"
            >
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
