import React, { FC, Fragment, ReactText } from 'react'
import { Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { Segment } from 'semantic-ui-react'
import { intervalLabel } from '../../types'
import { formatDate } from '../../Utils/dateUtils'

/**Tool tip for data point on the graph  */
const CustomTooltip:FC<{ payload: Payload<ValueType, ReactText>[] | undefined; label:string, active:boolean | undefined, graphInterval: intervalLabel }>= ({ active, payload, label ,graphInterval }) => {

  if (active && payload && payload.length) {
    let  tooltipDate = null

    /**Set date format based on interval */
    if (graphInterval === '10 days') tooltipDate = formatDate('ddd, dd mmm hh:mm', payload[0].payload.x)
    if(graphInterval === 'max' || graphInterval === '5 years') tooltipDate = formatDate('mmm yyyy', payload[0].payload.x)
    if(graphInterval !== '5 years' && graphInterval !== 'max' && graphInterval !== '10 days') tooltipDate = formatDate('ddd, dd mmm', payload[0].payload.x)

    return (
      <Fragment>
        <Segment.Group raised compact>
          <Segment textAlign='center' compact> {tooltipDate}</Segment>
          {/**For each line graph */
            payload.map( item =>
              <Segment.Group key={item.name} compact horizontal style= {{ backgroundColor:'white',color: item.color }} >
                <Segment style={{ border:'none' }} >{item.name}</Segment>
                <Segment style={{ border:'none' }}>{`${item.value} USD`}</Segment>
              </Segment.Group>
            )}

        </Segment.Group>
      </Fragment>

    )
  }

  return null
}

export default CustomTooltip