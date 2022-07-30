import React, { useEffect, useContext } from "react";
import Helmet from "next/head";
import { useRouter } from "next/router";

import GlobalContext from "../../context/GlobalContext";
import Header from "../Header/Header";



const Layout = ({ children, pageContext }) => {
  const gContext = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
  }, [gContext]);

    return (
        <>
          <Helmet>
            <title>Shop</title>
            {/* <link rel="icon" type="image/png" href={imgFavicon.src} /> */}
          </Helmet>
          <div className="container my-3">
            <Header />
            {children}    
          </div>
        </>
    );
  
};

export default Layout;
