import React from 'react'
import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap'

const FieldGroup = ({id, groupClass, label, help, ...props}) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props}/>
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
)
export default FieldGroup