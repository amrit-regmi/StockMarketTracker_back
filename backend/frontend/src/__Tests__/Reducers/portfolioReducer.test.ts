import portfolioReducer from '../../Store/Reducers/portfolioReducer'
import { intervalLabel } from '../../types'

describe( 'Test portfolio actions andreduce', () => {
  test('Remove_company_from_portfolio willupdate both graph andportfoliostate', () => {
    const previousState = {
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
        },
        testcompany2: {
          name:'testcompany2',
          color:'blue',
          symbol:'te2', price:'1', changePercent:'1', visible: true
        }
      },

      graph:{ loading:[],
        currentInterval:'10 days'as intervalLabel,
        data: {
          testcompany: {
            name:'testcompany',
            dataInterval:'10 days'as intervalLabel,
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          } ,
          testcompany2: {
            name:'testcompany2',
            dataInterval:'10 days'as intervalLabel,
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          } }
      }
    }

    const newState = portfolioReducer(previousState,{
      type:'REMOVE_COMPANY_FROM_PORTFOLIO',payload:{ symbol:'testcompany' } })

    expect(newState).toEqual( {
      portfolio:{
        testcompany2: {
          name:'testcompany2',
          color:'blue',
          symbol:'te2', price:'1', changePercent:'1', visible: true
        }
      },
      graph:{ loading:[],
        currentInterval:'10 days'as intervalLabel,
        data: {
          testcompany2: {
            name:'testcompany2',
            dataInterval:'10 days',
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          } }
      }
    })
  })


  test('get_company_quote will update both portfolio state', () => {
    const previousState = {
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
        },
      },
      graph:{ loading:[],
        currentInterval:'10 days'as intervalLabel,
      }
    }

    const currentState = portfolioReducer(previousState,{ type:'GET_COMPANY_QUOTE',payload:{
      company:{ name:'testcompany2',
        color:'blue',
        symbol:'te2', price:'1', changePercent:'1', visible: true }

    }
    })

    expect(currentState).toEqual({
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
        },
        te2: {
          name:'testcompany2',
          color:'blue',
          symbol:'te2', price:'1', changePercent:'1', visible: true
        }
      },
      graph:{ loading:[],
        currentInterval:'10 days'
      }
    })


  })
})