/* eslint-disable no-case-declarations */
import {  store } from '../../types'
import { ErrorAction } from '../Actions/errorActions'
export const SET_ERROR= 'SET_ERROR'
export const DISMISS_ERROR = 'DISMISS_ERROR'


const errorReducer = (state:store , action : ErrorAction ) :store => {
  switch(action.type){

  case SET_ERROR:
    return { ...state, errors: { ...state.errors, [Math.random().toString(36).slice(2)]: action.payload.error } }

  case DISMISS_ERROR:
    const copyState = { ...state }
    if(copyState.errors && copyState.errors[action.payload.id]){
      delete copyState.errors[action.payload.id]
    }
    return { ...copyState }

  default:
    return { ...state }
  }
}

export default errorReducer