import React, { useContext, useState } from 'react';
import Link from 'next/link';
import GlobalContext from '../../context/GlobalContext';
import useApiHelper from '../../api';
import { AiFillCaretDown } from 'react-icons/ai';

const Header = () => {
    const gContext = useContext(GlobalContext);
    const api = useApiHelper();

    const [show, setShow] = useState(false);

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
                    {!gContext.isLoggedIn && <>
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
                    </>}

                </ul>
            </div>
            <div className="social-icons d-flex align-items-center">
                <div className="me-5">
                    icons
                </div>
                {gContext.isLoggedIn && (
                    <ul className="profile list-unstyled mt-3">
                        <li className="profile-dropdown ">
                            <div onClick={() => setShow(!show)} className="d-flex align-items-center justify-content-around">
                                <div className="profile-img">
                                    {gContext?.user?.avatar ? (
                                        <img width="40" className="rounded-circle me-3" height="40" src={gContext?.user?.avatar} alt="" />
                                    ) : (
                                        <img width="40" className="rounded-circle me-3" height="40" src="./images/user.png" alt="" />
                                    )}
                                </div>
                                <AiFillCaretDown />
                            </div>

                            <ul className={show ? "dropdown-item list-unstyled" : "dropdown-item list-unstyled d-none"}>
                                <li className="nav-item my-2">
                                    <Link href="/profile">
                                        <a className="nav-link">Profile</a>
                                    </Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link href="/order">
                                        <a className="nav-link">Order</a>
                                    </Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link href="/cart">
                                        <a className="nav-link">Cart</a>
                                    </Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link href="#">
                                        <a onClick={() => gContext.handleLogout()} className="nav-link">Logout</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                )}
            </div>
        </div>
        <hr />
    </>
    )
}

export default Header
