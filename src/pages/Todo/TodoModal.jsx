import React from 'react'
import Button from '@mui/material/Button';
import Select from 'react-select';
import { ButtonsContainer, Field, Input, Label, Textarea } from '../../pages/styles';
import { ModalTitle } from '../../components/utils/CustomModal/styles';
import { CustomImageUploading } from '../../components';
import { CloseIcon, SaveIcon } from '../../constantes/icons';
import AnimatedModal from '../../components/utils/CustomModal/AnimatedModal';
import { providers } from '../../constantes';
import { ItemH2 } from '../Inventario/styles';
import { rols } from '../../constantes/rols';
import { priorities } from '../../constantes/priorities';
import { status as statusLevel } from '../../constantes/status';
import { CotizacionError } from '../Quotation/styles';

const TodoModal = (props) => {
    const { desc, priority, category,status } = props.data;
    const { handleInputChange, handleSelectChange, categories,onCreateItem,onUpdateItem,isUpdate,formErrors } = props;
    return (
        <AnimatedModal {...props}>
            <ModalTitle>
                <ItemH2>{props.title ? props.title : 'Actualizar'}</ItemH2>
            </ModalTitle>

            <Field>
                <Label>Estado</Label>
                <Select
                isDisabled={!isUpdate}
                className="dropdown"
                options={statusLevel}
                value={statusLevel.filter((c) => c.value === status)}
                onChange={(e) => { handleSelectChange(e.value, 'status') }}
              />
            </Field>

            <CotizacionError className="has-error">{formErrors&& formErrors.category}</CotizacionError>
            <Field>
                <Label>Departamento</Label>
                <Select
                className="dropdown"
                menuPosition='fixed'                 
                options={categories}
                getOptionLabel={option => `${option.data.name}`}
                getOptionValue={option => `${option.data.slug}`}
                value={categories.filter((c) => c.data.name === category)}
                onChange={(e) => { handleSelectChange(e.data.name, 'category') }}
              />
            </Field>

            <CotizacionError className="has-error">{formErrors&& formErrors.desc}</CotizacionError>
            <Field>
                <Label>Descripcíón</Label>
                <Textarea
                    value={desc || ''}
                    onChange={(e) => handleInputChange(e, 'desc')}
                />
            </Field>
            <CotizacionError className="has-error">{formErrors&& formErrors.priority}</CotizacionError>
            <Field>
                <Label>Prioridad</Label>
                <Select
                    className="dropdown"
                    options={priorities}
                    value={priorities.filter((c) => c.value === priority)}
                    onChange={(e) => { handleSelectChange(e.value, 'priority') }}
                    />
            </Field>

            
         
            <ButtonsContainer>
                <Button
                    type='button'
                    className='btn btn-danger fa-2x'
                    onClick={props.onClose}> <CloseIcon /> Cancelar</Button>
                <Button
                    type='button'
                    className='btn btn-primary fa-2x'
                    onClick={()=>{
                        isUpdate ? onUpdateItem() : onCreateItem()}}> <SaveIcon /> {isUpdate ? 'Actualizar' : 'Guardar'}</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default TodoModal