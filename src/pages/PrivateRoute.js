import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later


const PrivateRoute = ({children}) => {
  const {isAuthenticated, user}= useAuth0()

  if(user && isAuthenticated){
    return children
  }else{
   return <Navigate to="/" />
  }
  
};
export default PrivateRoute;
