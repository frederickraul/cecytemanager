import {  Fab } from '@mui/material';
import Compressor from 'compressorjs';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdWarning } from 'react-icons/md';
import { Link } from 'react-router-dom';
import TodoCard from '../../components/Card/TodoCard';
import AlertDialog from '../../components/utils/AlertDialog';
import { theme } from '../../constantes';
import { PlusIcon } from '../../constantes/icons';
import { status } from '../../constantes/status';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../lib/firebase';
import { ItemH2, ItemH4 } from '../Inventario/styles';
import { Line, TodoColumn, TodoContainer, TodoH3 } from './styles';
import TodoModal from './TodoModal';
import moment from 'moment'
import 'moment/locale/es';


const now = new Date();
var nowFormatted = moment(now).format('DD MMMM YYYY');
var createdAt = moment(now).format('YYYY-MM-DD');





const TodoList = () => {
  const [isUpdate, setisUpdate] = useState(false);
  const [categories, setcategories] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [index, setindex] = useState();

  const [data, setdata] = useState({status: 'pendiente'});
  const [todos, setTodos] = useState([]);
  const [modalTitle, setmodalTitle] = useState('Registrar')
  const [isModalOpen, setisModalOpen] = useState(false);


  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const { getData,saveData,setisLoading,updateData} = useAuth();

  const [compressedPhoto, setcompressedPhoto] = useState('');

  useEffect(() => {
    convertToBase64(compressedPhoto);
  }, [compressedPhoto]);


  const compressPhoto = (image) => {
    return new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        setcompressedPhoto(compressedResult);
      },
    });
  }

  const convertToBase64 = (file) => {
    if (file) {
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const base64 = fileReader.result;
          setdata(prevData => ({ ...prevData, ['photo']: base64 }));

        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  const onChangeImage = async (imageList, addUpdateIndex) => {
    setImages(imageList);
    if (imageList[0]) {
      const image = imageList[0].file;
      await compressPhoto(image);
    }else{
      setdata(prevData => ({ ...prevData, ['photo']: ''})) ;
    }
  };

  //----------------------------------

  useEffect(() => {
    getCategories();
    getTodos();
  }, [])


  const getCategories = () => {
    getData('categories', setcategories,'name');
  }
  const getTodos = () => {
    getData('todos', setTodos,'priority');
  }

  const handleSave = () => {
        saveData('todos',data);
        getTodos();
        handleModalClose();
      
  }

  const handleUpdate = () => {
    updateData('todos',data,index);
    getTodos();
    handleModalClose();
}

  const handleDelete = async() =>{
    setisLoading(true)
    await deleteDoc(doc(storage,'todos',index));
    getTodos();
    setisLoading(false);
    setisDialogOpen(false);
  }


const handleInputChange = (e, fieldName) => {
  const { value } = e.target;
  setdata(prevData => ({ ...prevData, [fieldName]: value }));
};

const handleSelectChange = (e, fieldName) => {
  console.log(e);
  setdata(prevData => ({ ...prevData, [fieldName]: e }));
};


const handleModalOpen = () => {
  setisModalOpen(true);
}

const handleModalClose = () => {
  setisModalOpen(false);
  setImages([]);
}

const handleRegisterClick = () => {
  handleModalOpen();
  setisUpdate(false);
  setdata({status: 'pendiente',createdAt: createdAt});
  setmodalTitle("Registrar");
}

const handleUpdateClick = (item,id) => {
  handleModalOpen();
  setisUpdate(true);
  setindex(id);
  setdata(item);
  item.photo && setImages([{data_url: item.photo}]);
  setmodalTitle("Actualizar");
}


const handleOpenAlert = (id) =>{
  setindex(id);
  setisDialogOpen(true);
}

const handleDialogToggle = () => {
  setisDialogOpen(!isDialogOpen);
}



  return(
    <div> 
    <div className='products-heading'>
    <Link to='/ajustes'>
      <ItemH2>
        Lista de pendientes
      </ItemH2>
    </Link>
      <p>Administrar</p>
    </div>

    <div className='floating-button-container'>
    <Fab className='floating-button' color="primary" aria-label="add" onClick={handleRegisterClick}>
            <PlusIcon />
          </Fab>
      </div>
    <TodoContainer>
     <TodoColumn>
      <TodoH3>Pendientes </TodoH3>
      <Line color='#FF4455'/>
     {todos?.map((item,index) => 
          <TodoCard 
              key={item.id} 
              item={item} 
              index={index} 
              handeModalOpen={() => handleUpdateClick(item.data,item.id)}
              handleInputChange={handleInputChange}
              handleDelete={handleOpenAlert}              
              setdata={setdata} />
        )}
      </TodoColumn>  
      <TodoColumn>
      <TodoH3>En progreso </TodoH3>
      <Line color='#e2cb76'/>
        </TodoColumn>   
        <TodoColumn>
        <TodoH3>Completados </TodoH3>
      <Line color='#a6c67e'/>
        </TodoColumn>   
     
    </TodoContainer>

    <TodoModal
       title={modalTitle}
       open={isModalOpen}
       onClose={handleModalClose}
       data={data}
       categories={categories}
       status={status}
       handleInputChange={handleInputChange}
       handleSelectChange={handleSelectChange}
       onChangeImage={onChangeImage}
       onCreateItem={handleSave}
       onUpdateItem={handleUpdate}
       setImages={setImages}
       maxNumber={maxNumber}
       images={images}
       isUpdate={isUpdate}
    />
    
    <AlertDialog 
        color={theme.danger}
        icon={<MdWarning/>}
        isOpen ={isDialogOpen} 
        action={handleDelete}
        handleClose={handleDialogToggle}
        //title={'Eliminar usuario'}
        message={'Estas a punto de eliminar la categoría. ¿Estas seguro?'}
        />

  </div>
  )
}



export default TodoList;