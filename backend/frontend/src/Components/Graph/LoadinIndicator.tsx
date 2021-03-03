import React, { FC } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useStore } from '../../Store/StoreProvider'

const LoadingIndicator:FC = () => {
  const [{ graph }] = useStore()

  if(!graph.loading.length){
    return null
  }

  return (
    <Dimmer active inverted style={{ height:'fit-content' ,zIndex:'auto' }}>
      <Loader indeterminate  size='tiny'>{`Loading financial data for ${graph.loading.join(',')}`}</Loader>
    </Dimmer>
  )
}

export default LoadingIndicator