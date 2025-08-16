import React from 'react'
import { TiDelete } from 'react-icons/ti';
import { ButtonContainer } from './styles';

const index = (props) => {
  return (
    <ButtonContainer {...props}>
        <TiDelete/>
    </ButtonContainer>
  )
}

export default index