import React, { useEffect, useState } from 'react'
import { HTTP } from '../config/axios'

function EmpDetails(props) {
    const [empDetails,setEmpDetails] = useState([])
    useEffect(() => {
        HTTP.get(`/list-employee/${props.location.props.id}`).then((data) => {
            setEmpDetails(data.data)
            console.log(empDetails);
        }).catch((err) => {
            console.log(err);
        })
    }, [empDetails])
    return (
        <div>
            <h1>Employee Details</h1>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{empDetails.name}</td>
                    </tr>
                    <tr>
      <td>Email</td>
      <td>{empDetails.email}</td>  
    </tr> <tr>
      <td>D.O.B</td>
      <td>{empDetails.dob}</td>  
    </tr> <tr>
      <td>Gender</td>
      <td>{empDetails.gender}</td>  
    </tr> <tr>
      <td>Mobile</td>
      <td>{empDetails.contact}</td>  
    </tr> <tr>
      <td>Address</td>
      <td>{empDetails.address}</td>  
    </tr> <tr>
      <td>Education</td>
      <td>{empDetails.education}</td>  
    </tr> <tr>
      <td>Experience</td>
      <td>{empDetails.experience}</td>  
    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default EmpDetails
