import React, { useContext, useState } from 'react';
import Link from 'next/link';
import GlobalContext from '../../context/GlobalContext';
import useApiHelper from '../../api';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';

const Header = () => {
    const gContext = useContext(GlobalContext);
    const api = useApiHelper();

    const [show, setShow] = useState(false);

    return (<>
        <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
                <Link href="/"><h3 style={{ 'cursor': 'pointer' }}>Logo</h3></Link>
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
                {gContext.isLoggedIn && (<>
                    <div className="me-5">
                        <Link href="/cart">
                            <a className="position-relative">
                                <span className="fs-3"><BsCartCheck /></span>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {gContext.cartCount}
                                    <span className="visually-hidden">cart items</span>
                                </span>
                            </a>
                        </Link>
                    </div>

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
                                        <a onClick={() => setShow(false)} className="nav-link">Profile</a>
                                    </Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link href="/order">
                                        <a onClick={() => setShow(false)} className="nav-link">Order</a>
                                    </Link>
                                </li>
                                <li className="nav-item my-2">
                                    <Link href="/cart">
                                        <a onClick={() => setShow(false)} className="nav-link">Cart</a>
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
                </>)}
            </div>
        </div>
        <hr />
    </>
    )
}

export default Header
