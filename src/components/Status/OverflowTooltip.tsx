import { Tooltip, Typography, TypographyProps } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export interface OverflowTypographyProps extends TypographyProps {
  children: React.ReactNode
}

// https://stackoverflow.com/a/71498056
export default function OverflowTooltip({
  children,
  ...props
}: OverflowTypographyProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [tooltipEnabled, setTooltipEnabled] = useState(false)

  useEffect(() => {
    const compareSize = () => {
      if (ref.current) {
        const compare = ref.current.scrollWidth > ref.current.clientWidth

        setTooltipEnabled(compare)
      }
    }
    compareSize()
    window.addEventListener('resize', compareSize)
    return () => window.removeEventListener('resize', compareSize)
  }, [])

  return (
    <Tooltip title={children} disableHoverListener={!tooltipEnabled}>
      <Typography
        ref={ref}
        noWrap
        overflow="hidden"
        textOverflow="ellipsis"
        {...props}
      >
        {children}
      </Typography>
    </Tooltip>
  )
}
