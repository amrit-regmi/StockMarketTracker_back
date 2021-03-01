import React,{ FC, Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import CompanyList from './CompanyList'

const Portfolio:FC = () => {
  return  (
    <Fragment>
      <Header as='h3'>My Portfolio</Header>
      <CompanyList></CompanyList>
    </Fragment>)
}

export default Portfolio