import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const {isAuthenticated,loginWithRedirect,logout,user,isLoading} = useAuth0()
  const [myuser,setMyuser] = useState(null);

  useEffect(()=>{
    if(isAuthenticated){
      setMyuser(user);
    }else{
      setMyuser(null)
    }
  },[isAuthenticated])
  return (
    <UserContext.Provider value={{
      loginWithRedirect,
      logout,
      isAuthenticated,
      user,
      isLoading,
      myuser
    }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
