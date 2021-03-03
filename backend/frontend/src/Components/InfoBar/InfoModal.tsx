import React,  { FC, useState }from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Menu, Modal } from 'semantic-ui-react'


const InfoModal:FC = () => {
  const [open,setOpen] = useState(false)

  return(
    <Modal
      open= {open}
      onOpen ={() => setOpen(true)}
      closeIcon
      closeOnEscape
      trigger={
        <Menu.Item icon position = 'right'>
          <Icon name='help circle'></Icon>
        </Menu.Item>}
      onClose={() => {
        setOpen(false)
      }}
    >
      <Modal.Header>About this App</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Due to limitations on api calls by provider on free version, only two company data can be fetched on duration of 1 minute. Demo mode supports unlimited calls but supports only following companies <br/>
            <span style={{ color:'green' }}> Sony , Nokia , Microsoft , Tesla , Apple </span>
          </p> <Link to='/demo' onClick= {() => setOpen(false)}>Click here</Link> to go to view on demo mode.

          <Header><Header.Subheader>View full source codeof app <a href="https://github.com/amrit-regmi/StockMarketTracker">here</a>. This App is powered by data from <a href='http://alphavantage.co'>Alphavantage</a> </Header.Subheader></Header>
        </Modal.Description>
      </Modal.Content>

    </Modal>
  )


}
export default InfoModal