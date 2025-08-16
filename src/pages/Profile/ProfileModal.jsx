import React from 'react'
import Button from '@mui/material/Button';
import Select from 'react-select';
import { ButtonsContainer, Field, Input, Label, Textarea } from '../styles';
import { ModalTitle } from '../../components/utils/CustomModal/styles';
import { CustomImageUploading } from '../../components';
import { CloseIcon, SaveIcon } from '../../constantes/icons';
import AnimatedModal from '../../components/utils/CustomModal/AnimatedModal';
import { providers } from '../../constantes';
import { ItemH2 } from '../Inventario/styles';
import { genders } from '../../constantes/genders';
import { CardHR } from '../../components/Card/UserCardNew/styles';
import { rols } from '../../constantes/rols';
import { CotizacionError } from '../Quotation/styles';
import { updatePassword } from 'firebase/auth';

const ProfileModal = (props) => {
    const { 
        handleInputChange, 
        updatePassword,
        formErrors, data } = props;
    const { email} = data;


    return (
        <AnimatedModal {...props}>
            <ModalTitle>
                <ItemH2>{props.title ? props.title : 'Cambiar contraseña'}</ItemH2>
            </ModalTitle>
                    <CotizacionError className="has-error">{formErrors&& formErrors.email}</CotizacionError>
                    <br/>

                    <Field>
                        <Label>Correo electrónico</Label>
                        <Input
                            placeholder='usuario@cecytebc.edu.mx'
                            type='email'
                            value={email || ''}
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                    </Field>

            
            <ButtonsContainer>
                <Button className='text-danger'
                    onClick={props.onClose}> Cancelar</Button>
                <Button className='text-primary' onClick={updatePassword}>  Cambiar contraseña</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default ProfileModal;