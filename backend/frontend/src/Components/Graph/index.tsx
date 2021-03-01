import React, { FC, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Segment } from 'semantic-ui-react'
import { useStore } from '../../Store/StoreProvider'
import { clipDataBasedonInterval } from '../../Utils/graphHelper'
import  * as graphHelper from '../../Utils/graphHelper'
import CustomTooltip from './CustomTooltip'
import IntervalChooser from './IntervalChooser'

const Graph:FC  = () => {
  const [{ graph  },] = useStore()
  const [maxDate ,setMaxDate] = useState(0) //Oldest data in the record

  /** Modify the instance graph data to display only the data for current interval also verify the oldest data*/
  const data = graph?.data && Object.keys(graph.data).map( company => {
    const companyData = graph.data && graph.data[company]
    const minDate = companyData && companyData.data[ companyData.data.length -1]?.x
    if(minDate && (maxDate === 0 ||  minDate < maxDate)){
      setMaxDate(minDate)
    }
    /**Return the data to map with the clipped data */
    return { ...companyData,data:companyData? clipDataBasedonInterval( graph.currentInterval,companyData.data): [], }
  })

  // Custom x-axis labels
  const xAxisLabels = graphHelper.getXAxisLabels(graph.currentInterval,maxDate)

  return (
    <Segment  >
      <IntervalChooser/>
      <ResponsiveContainer width='100%' aspect={5.0/3.0}>
        <LineChart data={data || []} margin= {{ top:20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            type='number'
            ticks= {xAxisLabels}
            domain={[xAxisLabels[0],'dataMax']}
            dataKey="x"
            allowDataOverflow={true}
            tickFormatter = { time => graphHelper.formatXAxisValues(graph.currentInterval,time)}

          />
          <YAxis
            domain={['auto', 'auto']}
            allowDataOverflow = {true}
            interval={0}
            axisLine={false}
            tickLine={false}
            tickFormatter = {price => Number.parseFloat(price).toFixed(2)}
          />
          {data && data.length && data.map( s =>
            s.isNotVisible?null:
              <Line
                key = {s.name}
                activeDot= {{ strokeWidth: 1, r: 2 }}
                connectNulls = {true}
                type="linear"
                dataKey="y"
                stroke={s.color}
                dot={false}
                data={s.data }
                name={s.name}
                strokeWidth={s.highlight?3:1}

              />)
          }
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content= {({ payload ,label , active }) => <CustomTooltip payload={payload} label={label} active= {active} graphInterval={graph.currentInterval}/>}/>
          <Legend />

        </LineChart>
      </ResponsiveContainer>
    </Segment>

  )
}

export default Graph