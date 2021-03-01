import React, { FC } from 'react'
import { Card, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../Store/StoreProvider'
// eslint-disable-next-line @typescript-eslint/ban-types
const SearchResult:FC <{onResultClick:Function}>= ({ onResultClick }) => {

  const [{ search,portfolio }]= useStore()

  /**If search not active return null */
  if(!search || !search.results){
    return null
  }

  /**Show result only for equitys and region united states and do not show companies already on porfolio*/
  const results =  search.results.filter((res: { [x: string]: string }) =>  res['4. region'] === 'United States' && res['3. type'] === 'Equity'  && !portfolio[res['1. symbol']])

  /**If search activebut no results */
  if(results && !results.length ) {
    return (
      <Segment color='red' attached='bottom'>
        <Header as='h5'>No Results Found </Header>
      </Segment>)
  }

  return (

    <Segment.Group raised style={{ marginTop:'2px' }}>
      {results?.map(result =>
        <Segment  padded as={Card} key = {result['1. symbol']} link fluid  onClick = {() => onResultClick(result['1. symbol'],result['2. name'])}>
          <Header as='h5'>
            {result['2. name']}
            <Header.Subheader>
              {result['1. symbol']}
            </Header.Subheader>
          </Header>
        </Segment>
      )}
    </Segment.Group>
  )

}
export default SearchResult