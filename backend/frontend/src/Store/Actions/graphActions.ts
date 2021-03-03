import { Dispatch } from 'react'
import services from '../../Services/service'
import { companies, dispatchActions, intervalLabel } from '../../types'
import { formatToCoordinate } from '../../Utils/graphHelper'
import { CHANGE_LINE_COLOUR, GET_GRAPH_FINANCIAL_DATA, SET_DATA_FETCHING, SET_HIGHLIGHT_LINE, SET_INTERVAL, SHOW_ON_GRAPH } from '../Reducers/graphReducer'
import { setError } from './errorActions'

export type GraphAction =
  | {
    type: 'SET_DATA_FETCHING',
    payload: {
      loading: boolean,
      symbol:string
    }
  }

  | {
      type: 'SET_INTERVAL',
      payload: {
        interval: intervalLabel,
      }
    }
  | {
      type: 'SET_HIGHLIGHT_LINE',
      payload: {
        symbol: string
        highlight: boolean,
      }
    }
  |
  {
    type: 'GET_GRAPH_FINANCIAL_DATA',
    payload: companies
  }
  | {
    type: 'CHANGE_LINE_COLOUR',
    payload: {
      symbol:string,
      color:string
    }
  }
  | {
    type: 'SHOW_ON_GRAPH',
    payload: {
      symbol:string,
      visible:boolean
    }
  }


/**
 * Retrives the financial data for the selected company
 * @param dispatch dispatcher
 * @param data { symbol:string -company symbol, interval:intervalLabel -graph's active interval label,color:string - color to represent the line on graph }
 */

export const getFinancialData = async ( dispatch:Dispatch<dispatchActions>, data:{ symbol:string , interval:intervalLabel ,color:string } ) : Promise<void> => {
  let financialdata
  let dataInterval = 'Daily'
  let errorType=''
  try {
    dispatch({
      type: SET_DATA_FETCHING,
      payload:{
        loading:true,
        symbol: data.symbol
      }

    })
    switch (data.interval){
    case '10 days':
      dataInterval = '60min'
      financialdata = await services.getDailyDataByInterval(data.symbol,'60min' ,'full')
      break

    default:
      financialdata = await services.getMonthlyData(data.symbol,'full')
      break
    }

    /**Catching Api Errors */
    if(!financialdata[`Time Series (${dataInterval})`] ){
      errorType = data.symbol
      if(financialdata['Error Message'] ) errorType = data.symbol+'_Error'
      if(financialdata['Information'] ) errorType = data.symbol+'_Information'
      if(financialdata['Note'] ) errorType = data.symbol+'_Note'

      throw new Error(financialdata['Error Message'] || financialdata['Information'] || financialdata['Note']  || 'Somtheng went wrong while retriveing full financial data for '+data.symbol)
    }

    dispatch({
      type :GET_GRAPH_FINANCIAL_DATA,
      payload: {
        [data.symbol]: {
          name:data.symbol,
          data:formatToCoordinate(financialdata[`Time Series (${dataInterval})`]),
          dataInterval: data.interval
        }
      } })

    dispatch({
      type: SET_DATA_FETCHING,
      payload:{
        loading:false,
        symbol: data.symbol
      }

    })

  } catch (error) {
    setError(dispatch,{
      type:errorType,
      error:error.message
    })

    dispatch({
      type: SET_DATA_FETCHING,
      payload:{
        loading:false,
        symbol: data.symbol
      }

    })

  }

}
/**
 * HIghtlights the graph line for the selected company
 * @param dispatch dispatcher
 * @param data {symbol:string company symbol}
 */
export const highlightLine =  (dispatch:Dispatch<dispatchActions>, data:{symbol:string} ) : void => {

  dispatch({
    type : SET_HIGHLIGHT_LINE,
    payload:{
      symbol:data.symbol,
      highlight:true
    } })
}

/**
 * Removes the highlight from the graph line for the selected company
 * @param dispatch dispatcher
 * @param data {symbol:string company symbol}
 */
export const removeHighlightLine =  (dispatch:Dispatch<dispatchActions>, data:{symbol:string} ) : void => {
  return dispatch({
    type : SET_HIGHLIGHT_LINE,
    payload:{
      symbol:data.symbol,
      highlight:false
    } })
}

/**
 * Changes the graph line for the selected company
 * @param dispatch dispatcher
 * @param data {symbol:string company symbol, color:string hexColor}
 */

export const changeLineColour = (dispatch:Dispatch<dispatchActions>, data:{symbol:string, color:string}): void => {
  return dispatch({
    type : CHANGE_LINE_COLOUR,
    payload:{
      symbol:data.symbol,
      color:data.color
    } })

}

/**
 * Toggles the visibiity of company on the graph
 * @param dispatch dispatcher
 * @param data {symbol:string -company symbol, visible:boolean}
 */
export const  changeVisibility = (dispatch:Dispatch<dispatchActions>, data:{symbol:string, visible:boolean}): void => {
  return dispatch({
    type: SHOW_ON_GRAPH,
    payload:{
      symbol:data.symbol,
      visible:data.visible
    }
  })
}

/**
 * Changes Interval on Graph
 * @param dispatch dispatcher
 * @param data {interval:intervalLabel}
 */
export const setGraphInterval = (dispatch:Dispatch<dispatchActions>, data:{interval:intervalLabel} ): void => {
  return dispatch({
    type: SET_INTERVAL,
    payload:{
      interval:data.interval
    }
  })
}

