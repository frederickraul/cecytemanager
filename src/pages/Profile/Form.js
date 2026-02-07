import Select from 'react-select';

import { Button} from '@mui/material';
import { rols } from '../../constantes/rols';
import { CotizacionButtons, CotizacionField, CotizacionInput, CotizacionLabel, CotizacionTextarea } from '../Quotation/styles'
import { CotizacionContainer, CotizacionCustomerInfo,CotizacionCustomerInfoContainer } from '../styles'

const Form = (props) => {
    const {data,handleChangePassword,} = props;
  return (
    <CotizacionContainer>
    <CotizacionCustomerInfo>
      <CotizacionCustomerInfoContainer>
        <CotizacionField>
          <CotizacionLabel>Tipo de usuario</CotizacionLabel>
          {data.rol=== 'god' ?
                <CotizacionInput
                    type='text'
                    readOnly={true}
                    value='Programador'
                />
                :
                <Select
                    isDisabled={true}
                    className="dropdown"
                    options={rols}
                    value={rols.filter((c) => c.value === data.rol)}
                    />
          }
        </CotizacionField>
        <CotizacionField>
          <CotizacionLabel>Nombre</CotizacionLabel>
          <CotizacionInput
            value={data.name || ''}
            disabled />
        </CotizacionField>
        <CotizacionField>
          <CotizacionLabel>Correo electrónico</CotizacionLabel>
          <CotizacionTextarea
            value={data.email || ''}
            disabled />
        </CotizacionField>

      </CotizacionCustomerInfoContainer>
    </CotizacionCustomerInfo>
    <CotizacionButtons className='buttons'>
      <Button variant='text' className='text-primary' onClick={handleChangePassword}>
      Cambiar contraseña
      </Button>
    </CotizacionButtons>
  </CotizacionContainer>
  )
}

export default Form