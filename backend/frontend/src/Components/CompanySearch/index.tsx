import React,{ FC, Fragment, useState } from 'react'
import { Icon, Input } from 'semantic-ui-react'
import { getCompanyQuote } from '../../Store/Actions/portfolioActions'
import { useStore } from '../../Store/StoreProvider'
import SearchResult from './SearchResult'
import * as searchActions from '../../Store/Actions/searchActions'


const CompanySearch:FC = () => {
  const [{ search },dispatch] = useStore()
  const[searchTag,setSearchTag] = useState('')

  const onSearch =  async () => {
    searchActions.searchCompany(dispatch,{ keyword:searchTag })
  }

  /**On input field change */
  const onSearchChange = (value:string) => {
    if(!value) clearSearch()
    setSearchTag(value)
  }


  /**On click on the results */
  const onResultClick = async (symbol:string, companyName:string) => {
    getCompanyQuote(dispatch,{ symbol,name:companyName })
    clearSearch()
    setSearchTag('')
  }

  /**Clear search */
  const clearSearch = () => {
    setSearchTag('')
    searchActions.clearSearch(dispatch)
  }

  return (
    <Fragment>
      <Input
        loading= {search?.loading}
        disabled= {search?.loading}
        style={{ borderRadius:'10px' }}
        size='large'
        fluid
        value={searchTag}
        onChange={
          (e,{ value }) => onSearchChange(value)
        }
        onKeyPress = {(e: { key: string }) => {
          if(e.key === 'Enter'){
            onSearch()
          }
        }}
        placeholder='Search and add to Portfolio'
        icon={<Icon name='search' size={searchTag?'large':'small'} link={searchTag?true:false} onClick = {() => onSearch()}/>}
      />
      <SearchResult onResultClick= {onResultClick}></SearchResult>

    </Fragment>


  )

}
export default CompanySearch