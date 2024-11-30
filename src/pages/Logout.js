import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Logout() {
  const { unsetUser } = useContext(UserContext);

  useEffect(() => {
    // Clear user data and token only once when the component mounts
    unsetUser();

    // The empty dependency array ensures this effect runs only once
  }, [unsetUser]);

  // Immediately navigate to the login page
  return <Navigate to="/login" replace />;
}
