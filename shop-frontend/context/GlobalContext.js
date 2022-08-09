import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { deleteAllCookies } from "../interceptors";
import useApiHelper from "../api";
import { useRouter } from "next/router";
const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  const api = useApiHelper();
  const router = useRouter();

  useEffect(() => {
    // decide if logged in or not
    if (Cookies.get('accessToken')) {
      return setIsLoggedIn(true);
    } else {
      return setIsLoggedIn(false);
    }
  })

  const getUserDetails = () => {
    if (Cookies.get('accessToken')) {
      api.getUser().then(res => {
        setUser(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [Cookies.get('accessToken')])


  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        getUserDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
