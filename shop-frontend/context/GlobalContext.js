import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { deleteAllCookies } from "../interceptors";
import useApiHelper from "../api";
import { useRouter } from "next/router";
const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState();

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

  const handleLogout = () => {
    Cookies.remove('accessToken');
    deleteAllCookies();
    localStorage.clear();
    setIsLoggedIn(false);
    api.logout().then(res => {
      router.push('/login')
    }).catch(error => {
      Cookies.remove('accessToken');
      deleteAllCookies();
    })
  }

  const getUserDetails = () => {
    if (Cookies.get('accessToken')) {
      api.getUser().then(res => {
        setUser(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const cartItems = () => {
    if (Cookies.get('accessToken')) {
      api.getCartList().then(res => {
        setCartCount(res.count)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [Cookies.get('accessToken')])

  useEffect(() => {
    cartItems();
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        handleLogout,
        user,
        getUserDetails,
        cartItems,
        cartCount
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
