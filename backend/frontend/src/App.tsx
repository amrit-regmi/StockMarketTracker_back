import React, { FC } from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import Graph from './Components/Graph'
import { Container, Segment, SegmentGroup } from 'semantic-ui-react'
import CompanySearch from './Components/CompanySearch'
import Portfolio from './Components/Portfolio'
import { StoreProvider } from './Store/StoreProvider'
import Error from './Components/Error/Error'
import { useParams } from 'react-router-dom'
import { resetBaseApiBaseUrl, setBaseApiBaseUrlToHost } from './Services/apiBaseUrl'


const App:FC = () =>  {
  type URLparams = {
    demo?:string
  }
  const params:URLparams = useParams()

  if(params.demo === 'demo'){
    setBaseApiBaseUrlToHost()
  }else{
    resetBaseApiBaseUrl()
  }


  return (
    <Container style= {{ minWidth:'95%' }}>
      <StoreProvider>
        <Error/>
        <SegmentGroup horizontal  >
          <Segment>
            <Portfolio/>
            <CompanySearch/>
          </Segment>
          <Graph/>
        </SegmentGroup>
      </StoreProvider>
    </Container>


  )
}

export default App
