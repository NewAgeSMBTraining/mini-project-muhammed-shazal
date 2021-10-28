import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { HTTP } from '../../config/axios'

function ApplyLeave(props) {
    const history = useHistory()
    const [data, setData] = useState({
        uid: props.location.props._id,
        email: props.location.props.email
    })
    const handleFormData = (e) => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        HTTP.post('/users/apply-leave', data).then((res) => {
            alert("Success")
            history.push({
                pathname: '/emp-home',
                props: { _id: props.location.props._id }
            })
        }).catch((err) => {
            alert("Failed")
        })
        console.log(data);
    }
    return (
        <div className="container-fluid">
            <h1>Apply for leave</h1>
            <form onSubmit={handleSubmit} class="form-horizontal ml-5">
                <div class="form-group">
                    <label for="inputdob">Leave From:</label>
                    <input onChange={(e) => { handleFormData(e) }} type="date" class="form-control col-md-3" id="from_leave_date" />
                </div><div class="form-group">
                    <label for="inputdob">Leave To:</label>
                    <input onChange={(e) => { handleFormData(e) }} type="date" class="form-control col-md-3" id="to_leave_date" />
                </div>
                <div class="form-group">
                    <label for="inputName">Reason: </label>
                    <input onChange={(e) => { handleFormData(e) }} type="text" class="form-control col-md-3 ml-1" id="reason" placeholder="Reason" />
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ApplyLeave
