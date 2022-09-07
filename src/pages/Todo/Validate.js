import React from 'react';

const Validate = (props) => {
    let error = 0;

    const isValidEmail = (email) =>{
        return /\S+@\S+\.\S+/.test(email);
      }

    const {setformErrors,data} = props;
    setformErrors([]);
    if(data.desc == null || data.desc == ""){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['desc']: 'El campo descripción es requerido.' }));
      error++;
    }
    if(data.priority == null || data.priority == ""){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['priority']: 'El campo prioridad es requerido.' }));
      error++;
    }
    if(data.category == null || data.category == ""){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['category']: 'El campo departamentos es requerido.' }));
      error++;
    }
    
    
  
    return error;
}

export default Validate