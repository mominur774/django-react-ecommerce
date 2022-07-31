import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import useApiHelper from '../api';

const Profile = () => {
    const [formData, setFormData] = useState({});
    const gContext = useContext(GlobalContext);
    const api = useApiHelper();

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAvatar = e => {
        const fm = new FormData();
        fm.append('avatar', e.target.files[0], e.target.files[0].name)
        api.updateUser(fm).then(res => {
            gContext.getUserDetails();
        }).catch(error => {
            console.log(error)
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        api.updateUser(formData).then(res => {
            gContext.getUserDetails();
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className="row mt-5 mx-auto">
            <form onSubmit={handleFormSubmit} action="" className="col-8 mx-auto">
                <div className="row">
                    <div className="col-12 mx-auto form-group mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            value={formData?.email ? formData?.email : gContext.user.email}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mx-auto form-group mb-3">
                        <label className="form-label" htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            onChange={handleChange}
                            value={formData?.first_name ? formData?.first_name : gContext.user.first_name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mx-auto form-group mb-3">
                        <label className="form-label" htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            onChange={handleChange}
                            value={formData?.last_name ? formData?.last_name : gContext.user.last_name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mx-auto form-group mb-3">
                        <label className="form-label" htmlFor="avatar">Avatar</label>
                        <input
                            type="file"
                            name="avatar"
                            className="form-control"
                            onChange={handleAvatar}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary my-3 w-100">Save</button>
            </form>
        </div>
    )
}

export default Profile
