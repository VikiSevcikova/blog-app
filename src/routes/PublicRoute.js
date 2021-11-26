import { useSelector } from 'react-redux';
import {
    Navigate
  } from 'react-router-dom';
  
  function PublicRoute({ children, ...rest }) {
    const { isLoggedIn } = useSelector(state => state.auth);

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    return children
  }
  
  export default PublicRoute;