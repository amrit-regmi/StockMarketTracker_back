/* eslint-disable @typescript-eslint/ban-types */
import React, { useReducer, createContext, FC, Dispatch, useMemo, useContext } from 'react'
import graph from './Reducers/graphReducer'
import portfolio from './Reducers/portfolioReducer'
import errors from './Reducers/errorReducer'
import search from './Reducers/searchReducer'
import { dispatchActions, store } from '../types'

const initialState:store =  {
  portfolio:{},
  graph:{
    currentInterval:'10 days'
  }
}

export const StoreContext = createContext<[store, Dispatch<dispatchActions>]>([
  initialState,
  () => initialState
])

const combineReducers = (...reducers:Function[]) => (state:store = initialState, action: dispatchActions) => {
  for(let i=0;i<reducers.length;i++)
    state = reducers[i](state, action)

  return state
}

export type ProviderValue = [store, Dispatch<dispatchActions>]

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer ( combineReducers (   graph, portfolio ,errors ,search  ), initialState)
  const memoisedStore = useMemo<ProviderValue>(() => [state, dispatch], [state])
  return (
    <StoreContext.Provider value ={memoisedStore}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = ():ProviderValue => useContext(StoreContext)

