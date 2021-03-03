import graphReducer from '../../Store/Reducers/graphReducer'
import { intervalLabel } from '../../types'

describe('test graph Reducer actions and reducer', () => {
  test('get_grapical_data updates graph state with data', () => {
    const previousState = {
      portfolio:{},
      graph:{ loading:[],
        currentInterval:'10 days'as intervalLabel
      }
    }

    const finalState = graphReducer(previousState, {
      type:'GET_GRAPH_FINANCIAL_DATA',
      payload: {
        'testCompany': {
          name:'testcompany',
          dataInterval: '10 days',
          data: [
            { x:17923000,y:10.4 }, { x:122122, y:123232 }
          ]
        }
      }
    })

    expect(finalState).toEqual(
      {
        portfolio:{},
        graph:{ loading:[],
          currentInterval:'10 days',
          data: { 'testCompany': {
            name:'testcompany',
            dataInterval: '10 days',
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          }

          }

        }
      })
  })

  test('set_highlight_line will update graph state', () => {

    const previousState = {
      portfolio:{},
      graph:{ loading:[],
        currentInterval:'10 days'as intervalLabel,
        data: {
          testcompany: {
            name:'testcompany',
            dataInterval: '10 days' as intervalLabel,
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          } }
      }
    }


    const finalState = graphReducer(previousState,{
      type:'SET_HIGHLIGHT_LINE',
      payload:{
        symbol: 'testcompany',
        highlight:true
      }
    })

    expect(finalState).toEqual(
      {
        portfolio:{},
        graph:{ loading:[],
          currentInterval:'10 days'as intervalLabel,
          data: {
            testcompany: {
              highlight:true,
              name:'testcompany',
              dataInterval: '10 days',
              data: [
                { x:17923000,y:10.4 }, { x:122122, y:123232 }
              ]
            } }
        }
      }
    )
  })


  test('set_line_color will change color on portfolio and garaph state', () => {

    const previousState = {
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
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
          } }
      }
    }

    const finalState = graphReducer(previousState,{
      type:'CHANGE_LINE_COLOUR',
      payload:{
        symbol: 'testcompany',
        color:'green',
      }
    })

    expect(finalState).toEqual(
      {
        portfolio:{
          testcompany: {
            name:'testcompany',
            color:'green',
            symbol:'te', price:'1', changePercent:'1', visible: true
          }
        },
        graph:{ loading:[],
          currentInterval:'10 days'as intervalLabel,
          data: {
            testcompany: {
              name:'testcompany',
              dataInterval:'10 days',
              data: [
                { x:17923000,y:10.4 }, { x:122122, y:123232 }
              ]
            } }
        }
      }
    )
  })
  test('set_interval updates the graph interval', () => {
    const previousState = {
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
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
          } }
      }
    }

    const finalState = graphReducer(previousState, {
      type:'SET_INTERVAL',
      payload: { interval:'1 month'
      }
    })

    expect(finalState).toEqual({
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
        }
      },
      graph:{ loading:[],
        currentInterval:'1 month',
        data: {
          testcompany: {
            name:'testcompany',
            dataInterval:'10 days',
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          } }
      }
    })
  })

  test('show_on_graph changes state onportfolio and graph', () => {
    const previousState ={
      portfolio:{
        testcompany: {
          name:'testcompany',
          color:'blue',
          symbol:'te', price:'1', changePercent:'1', visible: true
        }
      },
      graph:{ loading:[],
        currentInterval:'10 days'as intervalLabel,
        data: {
          testcompany: {
            name:'testcompany',
            dataInterval:'10 days'as intervalLabel,
            color:'blue',
            data: [
              { x:17923000,y:10.4 }, { x:122122, y:123232 }
            ]
          } }
      }
    }

    const finalState = graphReducer(previousState,{
      type:'SHOW_ON_GRAPH',
      payload:{
        symbol: 'testcompany',
        visible:false
      }
    })

    expect(finalState).toEqual(
      {
        portfolio:{
          testcompany: {
            name:'testcompany',
            color:'blue',
            symbol:'te', price:'1', changePercent:'1', visible: false
          }
        },
        graph:{ loading:[],
          currentInterval:'10 days'as intervalLabel,
          data: {
            testcompany: {
              dataInterval:'10 days',
              name:'testcompany',
              color:'blue',
              data: [
                { x:17923000,y:10.4 }, { x:122122, y:123232 }
              ]
            } }
        }
      }
    )
  })
})