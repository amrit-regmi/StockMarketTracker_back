/* eslint-disable no-case-declarations */
import {  store } from '../../types'
import { PortfolioAction } from '../Actions/portfolioActions'

export const ADD_COMPANY= 'ADD_COMPANY'
export const REMOVE_COMPANY_FROM_PORTFOLIO = 'REMOVE_COMPANY_FROM_PORTFOLIO'
export const GET_COMPANY_QUOTE = 'GET_COMPANY_QUOTE'


const portfolioReducer = (state:store , action : PortfolioAction ) :store => {
  switch(action.type){
  case GET_COMPANY_QUOTE:
    /**If the company already exists on portfolio */
    if(state.portfolio && Object.keys(state.portfolio).some(company => action.payload.company.symbol === company )) {
      return { ...state }
    }

    return { ...state, portfolio:{ ...state.portfolio, [action.payload.company.symbol]: action.payload.company } }

  case REMOVE_COMPANY_FROM_PORTFOLIO:
    const stateCopy = { ...state }
    delete stateCopy.portfolio[action.payload.symbol]
    if( stateCopy.graph.data && stateCopy.graph.data[action.payload.symbol]){
      delete stateCopy.graph.data[action.payload.symbol]
    }
    return { ...stateCopy }
  default:
    return { ...state }
  }
}

export default portfolioReducer