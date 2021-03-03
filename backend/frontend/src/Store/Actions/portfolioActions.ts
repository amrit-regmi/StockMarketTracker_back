import { Dispatch } from 'react'
import { getCompanyGlobalQuote } from '../../Services/service'
import { companyDetail, dispatchActions } from '../../types'
import { getRandomColor } from '../../Utils/randomColorGenerator'
import { GET_COMPANY_QUOTE, REMOVE_COMPANY_FROM_PORTFOLIO } from '../Reducers/portfolioReducer'
import { setError } from './errorActions'

export type PortfolioAction =
| {
    type: 'GET_COMPANY_QUOTE',
    payload: {
      company: companyDetail,
    }
  }
| {
    type: 'REMOVE_COMPANY_FROM_PORTFOLIO',
    payload: {
      symbol: string,
    }
  }

/**
   * @param dispatch dispatcher
   * @param data {symbol:string comapny symbol,name:string -company name}
   */

export const getCompanyQuote = async (dispatch: Dispatch<dispatchActions>,data :{symbol:string ,name:string}) : Promise<void> => {
  let errorType='default'
  try {
    const comapanyQuote = await getCompanyGlobalQuote(data.symbol)

    /**Catching Api Errors */
    if(!comapanyQuote['Global Quote'] ){
      errorType = data.symbol
      if(comapanyQuote['Error Message'] ) errorType = data.symbol+'_Error'
      if(comapanyQuote['Information'] ) errorType = data.symbol+'_Information'
      if(comapanyQuote['Note'] ) errorType = data.symbol+'_Note'

      throw new Error(comapanyQuote['Error Message'] || comapanyQuote['Information'] || comapanyQuote['Note']  || 'Somtheng went wrong while retriveing full financial data for '+data.symbol)
    }

    const companyData = {
      symbol : comapanyQuote['Global Quote']['01. symbol'],
      price : comapanyQuote['Global Quote']['05. price'],
      changePercent : comapanyQuote['Global Quote']['10. change percent'],
      name:data.name ,
      color: getRandomColor(),
      visible:true,
      selected:true
    }


    return dispatch({
      type: GET_COMPANY_QUOTE,
      payload:{
        company:{ ...companyData }
      }
    })

  } catch (error) {
    setError(dispatch,{
      type: errorType,
      error:error.message
    })

  }}

/**
   * Removes company from the portfolio and graph
   * @param dispatch dispatcher
   * @param data {symbol:string comapny symbol}
   */

export  const removeFromPortfolio = (dispatch:Dispatch<dispatchActions>, data: { symbol:string }):void  => {
  return dispatch ({
    type: REMOVE_COMPANY_FROM_PORTFOLIO,
    payload:{
      symbol:data.symbol
    }
  })

}