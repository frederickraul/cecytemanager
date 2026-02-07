import { Button } from '@mui/material';

import { Link } from 'react-router-dom';
import { userMan, userWoman } from '../../assets';
import { useAuth } from '../../context/AuthContext';
import { NavProfileContent, NavProfileIMG, NavProfileText } from './styles';

const Navbar = () => {
    const {currentUser} = useAuth();
    const {photo,gender,name} = currentUser? currentUser : '';

    return (
    <div className='navbar-container' style={{zIndex: 2}}>
        <p className='logo'>
            
        </p>
        <div>
        {
            currentUser.rol !== 'guess' ? 
            <Link to='/perfil'>
            <Button>
            <NavProfileContent>
                <NavProfileIMG src={photo ? photo : gender === 'Mujer' ? userWoman : userMan}/>

                <NavProfileText>
                {name}
                </NavProfileText>
            </NavProfileContent>
            </Button>
            </Link>
            :
            <Link to='/login'>
                <Button>
                Ingresar
                </Button>
            </Link>
        }
        </div>
      
    </div>
  )
}

export default Navbar;