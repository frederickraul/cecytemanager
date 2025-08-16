import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ItemH2 } from '../Inventario/styles';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';
import Form from './Form';
import ProfileModal from './ProfileModal';


const ProviderDetails = () => {
  const [id, setid] = useState();
  const {updateData,setisLoading, currentUser, getDataById,updateUserPassword} = useAuth(); 
  const [item, setitem] = useState([]);
  const [data, setdata] = useState([]);
  const {slug} = useParams();
  const [formErrors, setformErrors] = useState(['']);
  const [isModalOpen, setisModalOpen] = useState(false);


  useEffect(() => {
    getItem();
  }, []);

  const getItem =() =>{
    const id = currentUser.uid; 
    try {
      getDataById('users',setdata,id);
    } catch (error) {
      console.log(error);
    }
  }



  const handleChangePassword = () => {
    handleModalClose();
  }

  const updatePassword = () =>{
    let error = 0;
    error = Validate({setformErrors, data});
    if(error>0){ 
      return;
    }
    updateUserPassword(data.email);
    handleModalClose();
  }


  

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setdata(prevData => ({ ...prevData, [fieldName]: value }));
  };

  const handleModalClose = () => {
    setisModalOpen(!isModalOpen);
  };


  

  return (
    <div>
    <div className='products-heading'>
      <Link to='#'>
        <ItemH2>Perfil</ItemH2>
      </Link>
      <p className='text-capitalize'>Datos generales</p>
    </div>
      <Form formErrors={formErrors} data={data} handleInputChange={handleInputChange} handleChangePassword={handleChangePassword} isUpdate/>
      <ProfileModal
         data={data}
         open={isModalOpen}
         onClose={handleModalClose}
         formErrors={formErrors}
         handleInputChange={handleInputChange}
         updatePassword={updatePassword}
         />
    </div>
  )
}

export default ProviderDetails;