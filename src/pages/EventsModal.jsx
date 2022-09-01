import { DeleteIcon } from "../constantes/icons";

import React from 'react'
import Button from '@mui/material/Button';
import { ButtonsContainer, Field, ModalContainer, ModalFooter, ModalHeader } from './styles';
import { ModalTitle } from '../components/utils/CustomModal/styles';
import { CloseIcon } from '../constantes/icons';
import AnimatedModal from '../components/utils/CustomModal/AnimatedModal';
import { ItemH2, ItemH4 } from './Inventario/styles';
import { formatDate } from "@fullcalendar/react";

const EventsModal = (props) => {
    const { start, end,allDay, userName, title,action, userId, currentUserId,isGod} = props;

    return (
        <AnimatedModal {...props}>
            <ModalHeader>
                <ItemH4>{userName}</ItemH4>
                <div>
                {formatDate(start, {year: 'numeric', month: 'short', day: 'numeric'})}
                <br/>
                  {allDay ?
                  'Todo el dia'
                    :
                      end ?  
                      formatDate(start, {hour: 'numeric', minute: '2-digit'}) + " - " + formatDate(end, {hour: 'numeric', minute: '2-digit'})
                      :
                      formatDate(start, {hour: 'numeric', minute: '2-digit'})
                    }
                </div>
            </ModalHeader>
           <ModalContainer>
           <Field>
              <ItemH2>
                {title}
              </ItemH2>
            </Field>
          
         
            <ModalFooter>
                  
                <Button
                    type='button'
                    className='btn btn-primary fa-2x'
                    onClick={props.onClose}> <CloseIcon /> Cerrar</Button>
                    {(currentUserId === userId || isGod) &&
                    <Button
                    type='button'
                    className='btn btn-danger fa-2x'
                    onClick={action}> <DeleteIcon />Borrar</Button>
                    }
            </ModalFooter>
           </ModalContainer>
        </AnimatedModal>
    )
}

export default EventsModal