import { store } from '../../types'
import { SearchAction } from '../Actions/searchActions'

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'
export const SET_SEARCHING ='SET_SEARCHING'

const searchReducer = (state:store , action : SearchAction ) :store => {
  switch(action.type){
  case SET_SEARCHING:
    return { ...state,search:{ loading:true } }

  case GET_SEARCH_RESULTS:
    return ({ ...state,
      search : {
        loading: false,
        results: action.payload.data
      }
    })

  case CLEAR_SEARCH_RESULTS:
    return { ...state,search:undefined }
  default:
    return state
  }
}

export default searchReducer