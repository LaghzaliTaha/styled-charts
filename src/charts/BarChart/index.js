import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { COLORS, PALETTE } from 'global-design'
import { isArray } from 'lodash'
import { styles } from 'arbitration/components/SalesKPIs/constants'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Legend
} from 'recharts'
import { formatNum } from 'arbitration/utils/numbers'
import './index.css'

const moveTo = (x, y, { ry = 0, rx = 0 }) => `M${x + rx}, ${y + ry}`
const lineTo = (x, y, { ry = 0, rx = 0 }) => `L${x + rx}, ${y + ry}`
const quadraticCurveTo = (x, y, { ry = 0, rx = 0 }) =>
  `Q${x}, ${y} ${x + rx} ${y + ry}`

const drawRoundEdgesRectangle = (
  points,
  radius,
  { radiusTop = true, radiusBottom = false }
) => `${moveTo(points[0].x, points[0].y, { rx: radiusTop ? radius : 0 })}
  ${quadraticCurveTo(points[0].x, points[0].y, { ry: radiusTop ? radius : 0 })}
  ${lineTo(points[1].x, points[1].y, { ry: radiusBottom ? -radius : 0 })}
  ${quadraticCurveTo(points[1].x, points[1].y, {
    rx: radiusBottom ? radius : 0
  })}
  ${lineTo(points[2].x, points[2].y, { rx: radiusBottom ? -radius : 0 })}
  ${quadraticCurveTo(points[2].x, points[2].y, {
    ry: radiusBottom ? -radius : 0
  })}
  ${lineTo(points[3].x, points[3].y, { ry: radiusTop ? radius : 0 })}
  ${quadraticCurveTo(points[3].x, points[3].y, { rx: radiusTop ? -radius : 0 })}
  Z`
const RoundBar = (props) => {
  const { fill, x, y, width, height, rem, volume } = props
  const color = rem ? 'url(#linearGradient-rem)' : fill
  const radius = 3
  const haveRadiusBottom =
    isArray(volume) && volume[1] - volume[0] !== 0 && volume[0] !== 0
  const haveRadiusTop =
    (isArray(volume) && volume[1] - volume[0] !== 0) ||
    (!isArray(volume) && volume !== 0)
  const points = [
    { x, y },
    { x, y: y + height },
    { x: x + width, y: y + height },
    { x: x + width, y }
  ]
  const d = drawRoundEdgesRectangle(points, radius, {
    radiusBottom: haveRadiusBottom,
    radiusTop: haveRadiusTop
  })
  return <path d={d} stroke='none' fill={color} />
}

export default function AwesomeBarChat() {
  defs = (activeChartConfig) => (
    <defs>
      <linearGradient
        x1='100%'
        y1='0%'
        x2='50%'
        y2='180%'
        id='linearGradient-1'
      >
        <stop
          stopColor={activeChartConfig.reportTable.colorStart}
          offset='0%'
        />
        <stop
          stopColor={activeChartConfig.reportTable.colorStop}
          offset='100%'
        />
      </linearGradient>
      <linearGradient
        x1='100%'
        y1='0%'
        x2='50%'
        y2='180%'
        id='linearGradient-rem'
      >
        <stop stopColor='#485563' offset='0%' />
        <stop stopColor='#29323c' offset='100%' />
      </linearGradient>
      <linearGradient
        y1='-41.0283225%'
        x1='-693.788351%'
        y2='149.836518%'
        x2='-693.788351%'
        id='linearGradient-2'
      >
        <stop
          stopColor={activeChartConfig.regionCoverage.colorStart}
          offset='0%'
        />
        <stop
          stopColor={activeChartConfig.regionCoverage.colorStop}
          offset='100%'
        />
      </linearGradient>
    </defs>
  )
  const { family, sales, title, activeChartConfig } = this.props
  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      direction='column'
      spacing={24}
    >
      <Grid item xs={12}>
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <div style={styles.title}>{title}</div>
          </Grid>
          <Grid item xs={10}>
            <BarChart
              width={590}
              height={297}
              data={family}
              animationDuration={1000}
              isAnimationActive
              margin={{ top: 15, bottom: 24 }}
            >
              <CartesianGrid vertical={false} stroke={COLORS.ATHENS_GRAY} />
              <XAxis
                tickLine={false}
                dataKey='name'
                stroke={COLORS.ATHENS_GRAY}
                tick={{ fill: PALETTE.BLUE_TWO }}
              />
              <YAxis
                tickLine={false}
                stroke={COLORS.ATHENS_GRAY}
                tick={{ fill: PALETTE.BLUE_TWO }}
                formatter={(value) => formatNum(value)}
              />
              <Legend iconType='circle' iconSize={8} />
              {this.defs(activeChartConfig)}
              <Bar
                barSize={54}
                animationBegin={400}
                animationDuration={400}
                isAnimationActive={false}
                dataKey={!sales ? 'sales' : 'volume'}
                fill={
                  sales ? 'url(#linearGradient-1)' : 'url(#linearGradient-2)'
                }
                shape={<RoundBar />}
              >
                <LabelList
                  dataKey='volume'
                  style={{ fontWeight: 500, fontSize: 12, lineHeight: 14 }}
                  fill={PALETTE.BLUE_TWO}
                  formatter={(value) =>
                    value.length > 0
                      ? formatNum(value[1] - value[0])
                      : formatNum(value)
                  }
                  position='top'
                />
              </Bar>
              {!sales && (
                <Bar
                  barSize={54}
                  animationBegin={400}
                  animationDuration={400}
                  isAnimationActive={false}
                  dataKey='budget'
                  fill={PALETTE.BLUE_THREE}
                  shape={<RoundBar />}
                >
                  <LabelList
                    dataKey='budget'
                    style={{ fontWeight: 500, fontSize: 12, lineHeight: 14 }}
                    fill={PALETTE.BLUE_TWO}
                    formatter={(value) =>
                      value.length > 0
                        ? formatNum(value[1] - value[0])
                        : formatNum(value)
                    }
                    position='top'
                  />
                </Bar>
              )}
            </BarChart>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
