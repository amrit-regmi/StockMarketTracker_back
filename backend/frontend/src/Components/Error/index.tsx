import React, { useEffect } from 'react'
import { FC } from 'react'
import { Message } from 'semantic-ui-react'
import { removeError } from '../../Store/Actions/errorActions'
import { useStore } from '../../Store/StoreProvider'

const ErrorMessage:FC <{message:string, id:string}> = ({ message ,id }) => {
  const[,dispatch]=  useStore()
  useEffect(() => {
    const t  = setTimeout(() => dismissError(), 50000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const dismissError = () => {
    removeError(dispatch,{ id })
  }

  return (
    <Message
      onDismiss= {() => dismissError()}
      error
    >
      {message}
    </Message>
  )
}

const Error:FC = () => {
  const [{ errors, }] = useStore()
  return(
    <div className='errorContainer' >
      {errors && Object.keys(errors).map(key =>
        <ErrorMessage key={key} message={errors[key] as string} id={key}/>
      )}
    </div>
  )
}

export default Error