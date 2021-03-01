import { coordinateFormattedData, timeData } from '../types'

/**
 * Formats the retrived raw data from api - converts date string to date int on x axis and sets opening price on y axis
 * @param timeData {Object}
 * @returns array of cordinate formatted data x-dateInt y- price double
 */
export const formatToCoordinate = (timeData:timeData ):coordinateFormattedData => {
  const data: coordinateFormattedData = []
  timeData && Object.keys(timeData).reduce( ( p, dateString) => {
    data.push({
      x : Date.parse(dateString),
      y : parseFloat(timeData[dateString]['1. open'])
    })

    return p
  })
  return data
}