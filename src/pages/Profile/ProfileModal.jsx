import Button from '@mui/material/Button';
import { ButtonsContainer, Field, Input, Label } from '../styles';
import { ModalTitle } from '../../components/utils/CustomModal/styles';
import AnimatedModal from '../../components/utils/CustomModal/AnimatedModal';
import { ItemH2 } from '../Inventario/styles';
import { CotizacionError } from '../Quotation/styles';

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