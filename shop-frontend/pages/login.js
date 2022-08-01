import Cookies from 'js-cookie';
import React, { useState } from 'react';
import useApiHelper from '../api';
import { useRouter } from 'next/router';

const Login = () => {
    const [formData, setFormData] = useState({});
    const api = useApiHelper();
    const router = useRouter();

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        api.login(formData).then(res => {

            Cookies.set('accessToken', res.token);
            router.push('/')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="row mt-5 mx-auto">
            <form onSubmit={handleSubmit} className="col-8 mx-auto" action="">
                <div className="row">
                    <div className="col-12 mx-auto form-group mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mx-auto form-group mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mx-auto">
                        <button className="btn btn-primary my-3 w-100" type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
