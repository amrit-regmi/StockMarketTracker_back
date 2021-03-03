/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-case-declarations */
import { colors, store } from '../../types'
import { GraphAction } from '../Actions/graphActions'

export const SET_INTERVAL = 'SET_INTERVAL'
export const SET_HIGHLIGHT_LINE = 'SET_HIGHLIGHT_LINE'
export const SET_DATA_FETCHING = 'SET_DATA_FETCHING'
export const GET_GRAPH_FINANCIAL_DATA = 'GET_GRAPH_FINANCIAL_DATA'
export const CHANGE_LINE_COLOUR = 'CHANGE_LINE_COLOUR'
export const SHOW_ON_GRAPH = 'SHOW_ON_GRAPH'

const graphReducer = (state:store , action : GraphAction ) :store => {
  switch(action.type){
  case  SET_DATA_FETCHING:
    console.log('calledfetch',action.payload.symbol,action.payload.loading)
    if(action.payload.loading){

      if(state.graph.loading.includes(action.payload.symbol)){
        return { ...state }
      }
      return{
        ...state, graph: { ...state.graph, loading : [...state.graph.loading, action.payload.symbol] }
      }
    }else {
      console.log('calledfetch',action.payload.symbol,action.payload.loading)
      return{
        ...state, graph: { ...state.graph, loading : state.graph.loading.filter(symbol => symbol !== action.payload.symbol) }
      }

    }

  case GET_GRAPH_FINANCIAL_DATA:
    return {
      ...state,
      graph : { ...state.graph, data:  { ...state.graph.data ,...action.payload } }
    }

  case SET_HIGHLIGHT_LINE:
    const graphCopy = { ...state.graph }
    if(!graphCopy.data || !graphCopy.data[action.payload.symbol] ){
      return { ...state }
    }
    graphCopy.data[action.payload.symbol].highlight=action.payload.highlight
    return { ...state,graph:{ ...graphCopy } }

  case CHANGE_LINE_COLOUR:
    const graphCopy1 = { ...state.graph }
    if(!graphCopy1.data || !graphCopy1.data[action.payload.symbol] ){
      return { ...state }
    }
    graphCopy1.data[action.payload.symbol]!.color=action.payload.color
    return { ...state,graph:{ ...graphCopy1 }, portfolio: {
      ...state.portfolio,[action.payload.symbol]:{
        ...state.portfolio[action.payload.symbol],color: action.payload.color as colors
      }
    }, }

  case SET_INTERVAL:
    return { ...state,graph:{ ...state.graph, currentInterval: action.payload.interval } }

  case SHOW_ON_GRAPH:
    const graphCopy2 = { ...state.graph }
    if(!graphCopy2.data || !graphCopy2.data[action.payload.symbol] ){
      return { ...state }
    }

    graphCopy2.data[action.payload.symbol]!.isNotVisible = !action.payload.visible
    return { ...state,graph:{ ...graphCopy2 }, portfolio: {
      ...state.portfolio,[action.payload.symbol]:{
        ...state.portfolio[action.payload.symbol],visible: action.payload.visible
      }
    }, }

  default:
    return { ...state }
  }

}

export default graphReducer