import { DeleteIcon } from "../constantes/icons";

import Button from '@mui/material/Button';
import { ModalContainer, ModalDate, ModalFooter, ModalHeader } from './styles';
import { CloseIcon } from '../constantes/icons';
import AnimatedModal from '../components/utils/CustomModal/AnimatedModal';
import { ItemH2, ItemH4 } from './Inventario/styles';
import { formatDate } from "@fullcalendar/react";
import { MuiColorInput } from "mui-color-input";

const EventsModal = (props) => {
    const { start, end,allDay, userName, title,action, userId, currentUserId,isGod,selectedColor,setselectedColor,setisColorChanged} = props;

    const handleColorChange = (newValue) => {
      setselectedColor(newValue);
      setisColorChanged(true);
    }

    return (
        <AnimatedModal {...props}>
            <ModalHeader>
                <ItemH4>{userName}</ItemH4>
                <ModalDate>
                {formatDate(start, {year: 'numeric', month: 'short', day: 'numeric'})}
                <div>
                  {allDay ?
                  'Todo el dia'
                  :
                  end ?  
                  formatDate(start, {hour: 'numeric', minute: '2-digit'}) + " - " + formatDate(end, {hour: 'numeric', minute: '2-digit'})
                  :
                  formatDate(start, {hour: 'numeric', minute: '2-digit'})
                }
                </div>
                </ModalDate>
            </ModalHeader>
           <ModalContainer>
           <div style={{display:"flex", flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <ItemH2>
                {title}
              </ItemH2>
              <div style={{justifyContent: 'center', display:"flex", width:'90px'}}>
                <MuiColorInput 
                  style={{width: '50px'}}
                    value={selectedColor} 
                    size="small" variant="outlined"
                    onChange={handleColorChange}/>
                </div>
            </div>
         
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