import React, { useContext } from 'react';
import Link from 'next/link';
import GlobalContext from '../../context/GlobalContext';
import useApiHelper from '../../api';

const Header = () => {
    const gContext = useContext(GlobalContext);
    const api = useApiHelper();

  return (<>
    <div className="d-flex align-items-center justify-content-between">
      <div className="logo">
        <h3>Logo</h3>
      </div>
      <div className="">
        <ul className="d-flex align-items-center list-unstyled mt-3">
            <li className="nav-item mx-3">
                <Link href="/">
                    <a className="nav-link">Home</a>
                </Link>
            </li>
            <li className="nav-item mx-3">
                <Link href="#">
                    <a className="nav-link">About Us</a>
                </Link>
            </li>
            <li className="nav-item mx-3">
                <Link href="#">
                    <a className="nav-link">Contact Us</a>
                </Link>
            </li>
            {gContext.isLoggedIn ? (
            <li className="nav-item mx-3">
                <Link href="#">
                    <a onClick={()=> gContext.handleLogout()} className="nav-link">Logout</a>
                </Link>
            </li>
            ) : (<>        
            <li className="nav-item mx-3">
                <Link href="/login">
                    <a className="nav-link">Login</a>
                </Link>
            </li>
            <li className="nav-item mx-3">
                <Link href="/signup">
                    <a className="nav-link">Sign Up</a>
                </Link>
            </li>
            </>)}
            
        </ul>
      </div>
      <div className="social-icons">
        icons
      </div>
    </div>
    <hr />
    </>
  )
}

export default Header
