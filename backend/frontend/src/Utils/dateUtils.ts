import { intervalLabel } from '../types'

export type dateFormatsType = 'hh:mm' | 'ddd, dd mmm hh:mm' | 'ddd, dd mmm' | 'mmm yyyy' | 'dd mmm' | 'yyyy'

/**
 * Returns the provided data on specified format
 * @param format string accepts 'hh:mm' | 'ddd, dd mmm hh:mm' | 'ddd, dd mmm' | 'mmm yyyy' | 'dd mmm' | 'yyyy'
 * @param date dateObject or int
 * @return string formatted date
 */
export const formatDate = (format: dateFormatsType, date: Date | number):string => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  if(typeof date === 'string'){
    return date
  }

  let dateObj
  if(typeof date === 'number'){
    dateObj = new Date(date) as Date
  }else {
    dateObj = date
  }

  const year = dateObj.getFullYear()
  const month = months[dateObj.getMonth()]
  const date_ = dateObj.getDate().toString().padStart(2,'0')
  const day = days[dateObj.getDay()]
  const hours= dateObj.getHours().toString().padStart(2,'0')
  const minutes = dateObj.getMinutes().toString().padStart(2,'0')

  switch (format){
  case 'hh:mm':
    return `${hours}:${minutes}`
  case 'ddd, dd mmm hh:mm':
    return `${day}, ${date_} ${month} ${hours}:${minutes}`
  case 'ddd, dd mmm':
    return `${day}, ${date_} ${month}`
  case 'mmm yyyy':
    return `${month} ${year}`
  case 'dd mmm':
    return `${date_} ${month}`
  case 'yyyy':
    return year.toString()
  default:
    return date.toString()

  }
}

/**
 * Retruns the subtracted date from reference to todays date based on selected interval
 * @param interval selected Interval on graph
 * @param max optional, the last date of the retrived data ,used to calculate the starting poin if interval label is max
 * @retruns dateobject
 */

export const getStartingPointForInterval = (interval:intervalLabel, max?:number):Date => {
  const today = new Date()
  switch (interval){
  case '10 days':
    return new Date(today.getFullYear(),today.getMonth(),today.getDate()-10)
  case '1 month':
    return new Date(today.getFullYear(),today.getMonth()-1,today.getDate())
  case '6 month':
    return new Date(today.getFullYear(),today.getMonth()-6,today.getDate())
  case '1 year':
    return new Date(today.getFullYear()-1,today.getMonth(),today.getDate())
  case 'ytd':
    return new Date(today.getFullYear(),0,1)
  case '5 years':
    return new Date(today.getFullYear()-5,today.getMonth(),today.getDate())
  case 'max':
    if(max) return new Date(max)
    return new Date(today.getFullYear()-20,today.getMonth(),1)
  default:
    return today
  }
}