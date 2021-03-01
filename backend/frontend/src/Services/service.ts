/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
//import dummyResponseData from '../dummyResponseData.json'
import { DATA_INTERVAL, DATA_OUTPUTSIZE } from '../types'
import alphaVantage from './alphaVantage'

//const dummyData = {}
//const typedData = Object.assign(dummyResponseData,dummyData)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDailyDataByInterval = async (symbol: string, interval: DATA_INTERVAL, dataOutputsize:DATA_OUTPUTSIZE ): Promise<any > => {
  const response =  await axios.get(alphaVantage.time_series_intraday_api(symbol,dataOutputsize,interval))
  const data  =  response.data
  return data
}

export const getMonthlyData = async (symbol: string, dataOutputsize:DATA_OUTPUTSIZE ): Promise <any> => {
  const response = await axios.get(alphaVantage.time_series_daily_api(symbol,dataOutputsize))
  const data  =  response.data
  return data
}

export const searchByKeyword = async (symbol:string) : Promise<any> => {
  const response = await axios.get(alphaVantage.symbol_search_api(symbol))
  const data  = response.data
  return data
}

export const getCompanyGlobalQuote = async (symbol:string) :Promise<any> => {
  const response = await axios.get(alphaVantage.global_quote_api(symbol))
  const data = response.data
  return data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getDailyDataByInterval,getMonthlyData,searchByKeyword,getCompanyGlobalQuote }