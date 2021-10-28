import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { HTTP } from '../../config/axios';

function ChangePassword(props) {
    const history = useHistory()
    const [details, setDetails] = useState(props.location.props)
    const [data, setData] = useState()
    const handleSubmit = (e) => {
        e.preventDefault();
        data._id = details._id
        data.role = details.role
        HTTP.post('/common/change-password', data).then((data) => {
            alert("Password changed")
            if (details.role == 'admin') {
                history.push('/')
            } else {
                history.push('/emp-login')
            }
            console.log(data);
        }).catch((err) => {
            alert('Invalid old password')
            if (details.role == 'admin') {
                history.push('/admin-home')
            } else {
                history.push('/emp-home')
            }
            console.log(err);
        })
    }
    const handleFormData = (e) => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    return (
        <>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit} class="form-horizontal ml-5">
                <div class="form-group">
                    <label for="inputName">Old password</label>
                    <input onChange={(e) => { handleFormData(e) }} type="password" class="form-control col-md-3 ml-1" id="old_password" placeholder="Old Password" />
                </div>
                <div class="form-group">
                    <label for="inputName">New password</label>
                    <input onChange={(e) => { handleFormData(e) }} type="password" class="form-control col-md-3 ml-1" id="new_password" placeholder="New Password" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default ChangePassword
