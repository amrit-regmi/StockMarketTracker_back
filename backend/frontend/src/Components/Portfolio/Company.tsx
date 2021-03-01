import React, { FC, useEffect } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { changeLineColour, changeVisibility, getFinancialData, highlightLine ,removeHighlightLine } from '../../Store/Actions/graphActions'
import { removeFromPortfolio } from '../../Store/Actions/portfolioActions'
import { useStore } from '../../Store/StoreProvider'
import { companyDetail, intervalLabel } from '../../types'
import ColorChooser from '../ColorChooser/ColorChooser'

/**Renders Individual company on portfolio */
const Company:FC <{company: companyDetail | undefined}>= ({ company }) => {
  const [{ graph },dispatch] = useStore()
  const companySymbol = company && company.symbol

  /**Fetches the comany detail after the comany isrenderedon portfolio  */
  useEffect(() => {
    const getFinancials = async() => {
      if(company && companySymbol) {
        const interval:intervalLabel = graph?.currentInterval || '5 days'
        getFinancialData(dispatch,{ symbol:companySymbol, interval , color:company.color })
      }
    }

    /**Fetch the compnay financials */
    getFinancials()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!company || !companySymbol){
    return null
  }

  /** When user changes the color via color picker, changes the corresponding line on graph */
  const onColorChange = (color:string):void => {
    changeLineColour(dispatch, { symbol:companySymbol,color })
  }

  /** When user toggles visibility with Eye icon, shows/hides the line on graph */
  const onVisibilityChange = () => {
    changeVisibility(dispatch,{ symbol:companySymbol, visible:!company.visible } )
  }

  /** When user deletes the company */
  const onDelete = () => {
    removeFromPortfolio(dispatch, { symbol: companySymbol } )
  }

  /**When user hovers over company row,highlights the corresponding line on graph */
  const onMouseOver = () => {
    highlightLine(dispatch, { symbol:companySymbol })
  }

  /**When user mouse leves  company row, unhighlights the corresponding line on graph */
  const onMouseLeave = () => {
    removeHighlightLine(dispatch, { symbol:companySymbol })
  }

  return (
    <Table.Row key={company.name} onMouseOver={() => onMouseOver()} onMouseLeave= {() => onMouseLeave()} >
      <Table.Cell>{company.name} </Table.Cell>
      <Table.Cell>{companySymbol}</Table.Cell>
      <Table.Cell>$ {parseFloat(company.price).toFixed(2)}</Table.Cell>
      <Table.Cell>{parseFloat(company.changePercent).toFixed(2)} %
        <Icon name= {parseFloat(company.changePercent) >0 ? 'arrow up': 'arrow down'} color={parseFloat(company.changePercent) >0 ? 'green': 'red'}/>
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <Icon name= { company.visible ? 'eye': 'eye slash outline'  } link onClick= {() => onVisibilityChange()} />
        { company.visible &&
            <ColorChooser onSelect = {onColorChange } color= {company.color} />
        }
        <Icon name= 'cancel' color='red' onClick= {() => onDelete()} link/>
      </Table.Cell>
    </Table.Row>
  )
}

export default Company