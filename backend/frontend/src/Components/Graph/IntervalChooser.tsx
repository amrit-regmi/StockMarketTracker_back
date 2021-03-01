import React ,{ FC } from 'react'
import { Menu } from 'semantic-ui-react'
import { getFinancialData, setGraphInterval } from '../../Store/Actions/graphActions'
import { useStore } from '../../Store/StoreProvider'
import { intervalLabel } from '../../types'

const IntervalChooser:FC = () => {
  const [{ graph,portfolio },dispatch] = useStore()
  const intervalLabels = ['10 days','1 month', '6 month' ,'1 year', '5 years', 'ytd', 'max']
  const onItemCLick = (name:intervalLabel) => {
    //*If the store has intraday data need tore fetch monthly data for each company on portfolio
    // OR
    //*If the store has intraday data need tore fetch monthly data for each company on portfolio
    if((graph.currentInterval === '10 days' && name !== '10 days') ||  (graph.currentInterval !== '10 days' && name === '10 days')) {
      Object.keys(portfolio).forEach(async (company) => {
        getFinancialData(dispatch,{ symbol:portfolio[company].symbol,interval:name,color:portfolio[company].color })
      })
    }

    setGraphInterval (dispatch , { interval:name } )
  }

  return (
    <div>
      <Menu color='green'text fluid style={{ marginLeft:'25px' }}>
        {intervalLabels.map((label) =>
          <Menu.Item name = {label} key={label} active={graph.currentInterval === label}
            style={
              {
                paddingRight: '25px',
              }}
            onClick={(e,{ name }) => onItemCLick(name as intervalLabel)}></Menu.Item>
        )
        }
      </Menu>
    </div>
  )
}

export default IntervalChooser
