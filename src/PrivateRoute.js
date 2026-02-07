import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({children}) => {
 const {currentUser} = useAuth();
    if(!currentUser || currentUser.rol !=='god'){
        return <Navigate to="/login" replace/>
    }
    return(
        <>
        {children}
        </>
    )
}

export default PrivateRoute