import React, {useState} from 'react';
import useApiHelper from '../api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SignUp = () => {
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
        if(formData.password === formData.password2) {
            api.signup(formData).then(res=>{
                Cookies.set('accessToken', res.token);
                router.push('/')
            }).catch(error=> {
                console.log(error)
            })
        } else {
            console.log("Password doesn't match!")
        }
    }

  return (
    <div className="row mt-5 mx-auto">
      <form onSubmit={handleSubmit} className="col-8 mx-auto" action="">
        <div className="row">
            <div className="col-6">
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="first_name">First Name</label>
                    <input 
                        type="text" 
                        name="first_name"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-6">
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="last_name">Last Name</label>
                    <input 
                        type="text" 
                        name="last_name"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
        
        <div className="row">
            <div className="col-6">
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-6">
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="password">Confirm Password</label>
                    <input 
                        type="password" 
                        name="password2"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>

        <button className="btn btn-primary my-3 w-100"type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
