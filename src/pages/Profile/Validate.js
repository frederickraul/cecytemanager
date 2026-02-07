const Validate = (props) => {
  let error = 0;

  const isValidEmail = (email) =>{
      return /\S+@\S+\.\S+/.test(email);
    }

  const {setformErrors,data} = props;

  setformErrors([]);
  if(!isValidEmail(data.email)){
    setformErrors({'email': 'El correo electrónico no es válido.' });
    error++;
  }
  return error;
}

export default Validate