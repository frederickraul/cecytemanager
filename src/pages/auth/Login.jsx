import React, { useState,useEffect } from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Snackbar
} from '@mui/material';
import { cecytebcLogoSmall } from '../../assets';
import CustomCheckbox from '../../components/utils/CustomCheckbox';
import { useAuth } from '../../context/AuthContext';
import RollerSpinner from '../../components/utils/spinner/roller';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const history = useNavigate();

  const [checked, setChecked] = useState(false);
  const [data, setdata] = useState([]);
  const { 
        token, 
        login, 
        currentUser, 
        setisAlertOpen,
        setalertMessage,
        setalertSeverity, 
        setisLoading } = useAuth();

        useEffect(() => {
         currentUser && currentUser.uid && history('/');

        }, [currentUser])
        

  const handleClose = () => {
    setisAlertOpen(false);
  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setdata(prevData => ({ ...prevData, [fieldName]: value }));
    //console.log(data);
  };


  const handleChange = () => {
    setChecked(!checked);
    //console.log(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === '' || data.password === undefined) {
      setalertSeverity('error');
      setalertMessage('La contraseña no puede estar en blanco.');
      setisAlertOpen(true);
     return;
    }
    try {
      setalertMessage('');
      setisLoading(true);
      await login(data.user, data.password);
    } catch (error) {
      console.log(error.message);
      setisAlertOpen(true);
      setalertSeverity('error');
      //Error (auth/email-already-in-use).
      switch (error.message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          setalertMessage("El correo electronico ya esta en uso.");
          break;
        case 'Firebase: Error (auth/network-request-failed).':
          setalertMessage("Asegurate de tener una conección a internet.");
          break;
        case 'Firebase: Error (auth/user-not-found).':
          setalertMessage("El usuario no existe en nuestro registro.");
          break;
        case 'Firebase: Error (auth/missing-email).':
          setalertMessage("El usuario o contraseña estan en blanco.");
          break;
        case 'Firebase: Error (auth/invalid-email).':
          setalertMessage("El correo electronico es invalido.");
          break;
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          setalertMessage("El correo electronico debe tener al menos invalido caracteres.");
          break;
        default:
          setalertMessage('Hubo un error');

      }
    }
    setisLoading(false);
  }

  return (

    <div className='auth-background'>
    
      <div className="auth-container">
        <div>
          <img src={cecytebcLogoSmall} alt="rocket" className="rocket" />
          <div className="text">
            <h1>Bienvenido</h1>
            <p>CECyTE Manager</p>
          </div>

        </div>
        <div>
        </div>
        <form className="form">
          <div className="animated-input">
            <input type="text" placeholder="Usuario" value={data.user || ''}
              onChange={(e) => handleInputChange(e, 'user')} />
            <input type="password" placeholder="Contraseña" value={data.password || ''}
              onChange={(e) => handleInputChange(e, 'password')} />

          </div>
          <div className="check">

            <p className="forget"><a href="#">¿Olvidaste la contraseña?</a></p>
          </div>
        </form>
        <Button className="btn btn-primary-alt" onClick={handleSubmit}>Ingresar</Button>

      </div>
    </div>
  );
};

export default Login;
