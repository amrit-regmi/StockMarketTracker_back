import { Dispatch } from 'react'
import services from '../../Services/service'
import { dispatchActions, resultData } from '../../types'
import { CLEAR_SEARCH_RESULTS, GET_SEARCH_RESULTS, SET_SEARCHING } from '../Reducers/searchReducer'
import { setError } from './errorActions'

export type SearchAction =
  |{
      type: 'SET_SEARCHING',
    }
  | {
      type: 'GET_SEARCH_RESULTS',
      payload: {
        data: resultData[],
      }
    }
  | {
      type: 'CLEAR_SEARCH_RESULTS',
    }

/**
   * Gets the suggested companies for the given keyword
   * @param dispatch dispatcher
   * @param data {keyword: string}
   */
export const searchCompany = async (dispatch:Dispatch<dispatchActions>, data:{keyword:string}):Promise<void> => {
  try {
    const searchData =  await services.searchByKeyword(data.keyword)
    /**Catching Api Errors */
    if(searchData['Error Message']  || searchData['Information'] || searchData['Note']  || !searchData.bestMatches){
      throw new Error(searchData['Error Message'] || searchData['Information'] || searchData['Note']  || 'Somtheng went wrong while searching')
    }

    return  dispatch ({
      type: GET_SEARCH_RESULTS,
      payload: {
        data: searchData.bestMatches,
      }
    })
  } catch (error) {
    setError(dispatch,{ error:error.message })
  }
}

/**
 * Sets the search status to loading,loadersare displayed on Ui whrere neessary
 * @param dispatch dispatcher
 */
export const setSearching =(dispatch:Dispatch<dispatchActions>):void => {
  return dispatch ({
    type: SET_SEARCHING,
  })
}
/**
 * Clears the search results
 * @param dispatch dispatcher
 */
export const clearSearch =(dispatch:Dispatch<dispatchActions>):void => {
  return dispatch ({
    type: CLEAR_SEARCH_RESULTS,
  })
}