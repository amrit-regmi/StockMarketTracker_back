import React, { FC } from 'react'
import { Menu } from 'semantic-ui-react'
import InfoModal from './InfoModal'

const InfoBar:FC = () => {
  return (
    <Menu color='blue' inverted >
      <Menu.Item >
        <Menu.Header as ='h4'>Stock Market Tracker</Menu.Header>
      </Menu.Item>
      <InfoModal/>
    </Menu>
  )
}

export default InfoBar