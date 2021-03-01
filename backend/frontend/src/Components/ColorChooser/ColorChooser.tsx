import React, {  FC, useState } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { colors } from '../../types'

/**Color Chooser component */
// eslint-disable-next-line @typescript-eslint/ban-types
const ColorChooser:FC <{ onSelect:Function, color: string; }> = ({ onSelect,color }) => {
  const [open,setOpen] = useState(false)

  return (
    <Popup
      open = {open}
      trigger = {<Icon name= 'circle' style={{ color: color }} link/> }
      content= {
        <div  className='colorChooserContainer' >
          {Object.values(colors).map( color =>
            <button key={color} className='colorChooser' style = {{ backgroundColor:color }} onClick={() => {
              onSelect(color)
              setOpen(false)
            }}/>
          )}
        </div>}
      closeOnEscape
      on='click'
      onClose = {() => setOpen(false)}
      onOpen = {() => setOpen(true)}
      closeOnTriggerClick
    >
    </Popup>
  )

}

export default ColorChooser