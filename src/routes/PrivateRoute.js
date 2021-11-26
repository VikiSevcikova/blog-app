import { useSelector } from 'react-redux';
import {
    Navigate
  } from 'react-router-dom';
  
  function PrivateRoute({ children, ...rest }) {
    const { isLoggedIn } = useSelector(state => state.auth);

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children
  }
  
  export default PrivateRoute;