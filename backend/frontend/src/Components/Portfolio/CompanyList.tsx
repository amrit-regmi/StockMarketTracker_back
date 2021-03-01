import React,{ FC, Fragment } from 'react'
import { Header, Segment, Table, TableHeaderCell } from 'semantic-ui-react'
import { useStore } from '../../Store/StoreProvider'
import Company from './Company'

const CompanyList:FC = () => {
  const [{ portfolio },] = useStore()

  const tableHeader = ['Company', 'Symbol', 'Price', 'Change','ToggleView' ]
  /**If there is nocomany on portfolio */
  if(portfolio && !Object.keys(portfolio).length){
    return (
      <Segment>
        <Header as= 'h5'>No company on your portfolio. Please search and add from below</Header>
      </Segment>
    )
  }

  return  (
    <Fragment>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            {tableHeader.map(header =>
              <TableHeaderCell key= {header}> {header}</TableHeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {portfolio &&  Object.keys(portfolio).map((company,i) => (
            <Company key={i} company ={portfolio[company]}/>
          ))}
        </Table.Body>
      </Table>

    </Fragment>)
}

export default CompanyList