import searchReducer from '../../Store/Reducers/searchReducer'
import { intervalLabel } from '../../types'

describe('Tests Search Actions and Reducers', () => {
  describe('testing Search Reducer', () => {
    test('set_seraching_action changes search state to loading', () => {
      const previousState = {
        portfolio:{},
        graph:{ loading:[],
          currentInterval:'10 days'as intervalLabel
        }
      }
      const newState = searchReducer(previousState,{ type:'SET_SEARCHING' })
      expect(newState).toEqual(
        {
          portfolio:{},
          graph:{ loading:[],
            currentInterval:'10 days'
          },
          search:{ loading:true }
        }
      )
    })

    test('get_search_result changes sets data to search state',() =>  {
      const previousState = {
        portfolio:{},
        graph:{ loading:[],
          currentInterval:'10 days'as intervalLabel
        }
      }
      const newState = searchReducer(previousState,{
        type:'GET_SEARCH_RESULTS',
        payload:{
          data: [{ '1. symbol':'TEST','2. name':'Testing' }] }

      })
      expect(newState).toEqual(
        {
          portfolio:{},
          graph:{ loading:[],
            currentInterval:'10 days'
          },

          search:{ loading:false ,results:[{ '1. symbol':'TEST','2. name':'Testing' }] }
        },
      )
    })

    test('clear search result changes sets data to search state',() =>  {

      const previousState = {
        portfolio:{},
        graph:{ loading:[],
          currentInterval:'10 days'as intervalLabel
        },
        search:{ loading:false ,results:[{ '1. symbol':'TEST','2. name':'Testing' }] }
      }
      const newState = searchReducer(previousState,{
        type:'CLEAR_SEARCH_RESULTS'
      })

      expect(newState).toEqual( {
        portfolio:{},
        graph:{ loading:[],
          currentInterval:'10 days'
        },
        search: undefined })
    },)

  })

})