import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { deleteAllCookies } from "../interceptors";
import useApiHelper from "../api";
import { useRouter } from "next/router";
const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const api = useApiHelper();
  const router = useRouter();

  useEffect(()=>{
    // decide if logged in or not
    if (Cookies.get('accessToken')) {
      return setIsLoggedIn(true);
    } else {
      return setIsLoggedIn(false);
    }
  })

  const handleLogout = () => {
    Cookies.remove('accessToken');
    deleteAllCookies();
    localStorage.clear();
    setIsLoggedIn(false);
    api.logout().then(res=>{
      router.push('/login')
    }).catch(error=>{
      Cookies.remove('accessToken');
      deleteAllCookies();
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        handleLogout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
