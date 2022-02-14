import {Navigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({children, ...rest}) {

    // console.log(element);
    const {currentUser} = useAuth();

  return (
    currentUser ? children : <Navigate to="/login"/>
  )
}

export default PrivateRoute;