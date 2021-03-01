import { coordinateFormattedData, intervalLabel } from '../types'
import { formatDate, getStartingPointForInterval } from './dateUtils'

/**
 * Get X-axis label based on interval value
 * @param graphInterval interval
 * @param max  the last retrivavle date of the comany data if itnerval label is max
 * @returns Integer Array of x-axis labels
  */
export const getXAxisLabels = (graphInterval: intervalLabel, max?:number):number[] => {
  const axisLabels = []
  const startFromDate = getStartingPointForInterval(graphInterval,max)
  const now = new Date()


  if(graphInterval === '10 days' || graphInterval === '1 month'){
    for (let d = startFromDate; d <= now; d.setDate(d.getDate() +1)) {
      axisLabels.push((new Date(d)).getTime())
    }
  }

  if(graphInterval === 'ytd' || graphInterval === '6 month' || graphInterval === '1 year'){
    for (let d = startFromDate; d <= now; d.setMonth(d.getMonth() +1)) {
      axisLabels.push((new Date(d)).getTime())
    }
  }

  if(graphInterval === '5 years' || graphInterval === 'max'){
    for (let d = startFromDate; d <= now; d.setFullYear(d.getFullYear() +1)) {
      axisLabels.push((new Date(d)).getTime())
    }
  }

  return axisLabels
}

/**
 * Gets x-axis values as string date based on interval
 * @param graphInterval interval
 * @param date Date or Integer
 * @returns string of formatted date
  */
export const formatXAxisValues =(graphInterval: intervalLabel, date: number | Date):string => {
  let formattedDate =''
  if(graphInterval === '10 days' || graphInterval === '1 month'){
    formattedDate = formatDate('dd mmm',date)
  }
  if(graphInterval === '6 month' || graphInterval === 'ytd' || graphInterval === '1 year'){
    formattedDate = formatDate('mmm yyyy',date)
  }
  if(graphInterval === '5 years' || graphInterval === 'max'){
    formattedDate = formatDate('yyyy',date)
  }

  return formattedDate
}

/**
 * Clips the coordinate formatted data based on selected interval on graph so domain on y-axis is calculated properly
 * @param graphInterval string selected interval in graph
 * @param data {Object} coordinateformatted data
 * @returns array of cordinate formatted data x-dateInt y- price double
 */
export const clipDataBasedonInterval = (graphInterval: intervalLabel, data: coordinateFormattedData): coordinateFormattedData => {
  if(graphInterval === 'max') {
    return data
  }
  const startFromDate = getStartingPointForInterval(graphInterval).getTime()
  return data.filter(cordinateObject => cordinateObject.x >= startFromDate )
}
