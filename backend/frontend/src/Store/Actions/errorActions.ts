import { Dispatch } from 'react'
import { dispatchActions } from '../../types'
import { DISMISS_ERROR, SET_ERROR } from '../Reducers/errorReducer'

export type ErrorAction =
| {
    type: 'SET_ERROR',
    payload: {
      error: string,
    }
  }
| {
    type: 'DISMISS_ERROR',
    payload: {
      id: string,
    }
  }

/**Sets Error Notification */
export const setError =  (dispatch:Dispatch<dispatchActions>, data:{ error:string} ): void => {
  return dispatch ({
    type: SET_ERROR,
    payload:{
      error:data.error
    }
  })
}

/**Removes Error Notification */
export  const removeError = (dispatch:Dispatch<dispatchActions>, data:{id:string}):void  => {
  return dispatch ({
    type: DISMISS_ERROR,
    payload:{
      id:data.id
    }
  })

}


