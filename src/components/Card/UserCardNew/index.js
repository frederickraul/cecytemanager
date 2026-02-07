import { Link } from 'react-router-dom';
import {
  CardAvatar,
  CardContent,
  CardDelete,
  CardDescription,
  CardH4,
  CardHR,
  CardImg,
  CardInfo,
  CardP,
  CardText,
  CardUp,
  CardWrapper,
} from './styles';
import { userMan, userWoman } from '../../../assets';
import { AiOutlineClose } from 'react-icons/ai';

const UserCardNew = ({ item: { data }, item, index, handeModalOpen, setdata, setImages, handleDelete,userId,userType }) => {
  const { name, gender, photo,rol } = data;
  const { id } = item;

  let rolName = '';
  switch(rol){
    case 'god':
      rolName = 'Programador';
      break;
    case 'administrativo':
      rolName = 'Administrativo';
      break;
    case 'coordinador':
      rolName = 'Coordinador';
      break;
    case 'subdirector':
      rolName = 'Subdirector';
      break;
    case 'profesor':
      rolName = 'Profesor';
      break;
    default:
      rolName = 'Usuario';
  }

  const handleModal = () => {
    handeModalOpen();

  }
  return (
      <CardWrapper>
        <Link to='#'>
          <CardContent>
            <CardUp background={index}>
              <div>
                {(userId === id || rol !== 'god') &&
                <CardDelete onClick={()=>handleDelete(id)}>
                  <AiOutlineClose />
                </CardDelete>
                }
              </div>
              <CardAvatar>
                <CardImg
                  onClick={handleModal}
                  backgroundIMG={photo ? photo : gender === 'Mujer' ? userWoman : userMan }>
                </CardImg>

              </CardAvatar>

            </CardUp>
            <CardInfo onClick={handleModal}>
              <CardH4>{name}</CardH4>
             <CardText>{rolName}</CardText>
              <CardHR/>
              <CardDescription align='flex-start' column>
                <CardP>Sexo:</CardP>
                {gender}
              </CardDescription>
            </CardInfo>
          </CardContent>
        </Link>
      </CardWrapper>
  )
}

export default UserCardNew;