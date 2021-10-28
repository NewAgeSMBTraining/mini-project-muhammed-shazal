import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { HTTP } from '../../config/axios'
import './EditEmpDetails.css'
function EditEmpDetails(props) {
  const history = useHistory()
  const [empDetails, setEmpDetails] = useState('')
  const [data, setData] = useState()
  useEffect(() => {
    setEmpDetails(props.location.props)
    if (empDetails.gender === 'male') {
      document.getElementById("male").checked = true;
    } if (empDetails.gender === 'female') {
      document.getElementById("female").checked = true;
    }
  }, [empDetails])
  const handleFormData = (e) => {
    if (e.target.id == "male" || e.target.id == "female") {
      const newData = { ...data }
      newData['gender'] = e.target.name
      setData(newData)
    }
    else {
      const newData = { ...data }
      newData[e.target.id] = e.target.value
      setData(newData)
      console.log(data);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    HTTP.post(`/edit-employee/${empDetails._id}`, data).then((data) => {
      history.push('/admin-home')
    }).catch((err) => {
      alert('Updation Failed')
    })
  }
  return (
    <div className="container-fluid form">
      <h1>Update The Details..</h1>
      <form onSubmit={handleSubmit} class="form-horizontal ml-5">
        <div class="form-group" className="row">
          <label for="inputName" className="col-md-1" >Name </label>
          <input onChange={(e) => { handleFormData(e) }} type="text" class="form-control col-md-3 ml-1" id="name" placeholder="Name" defaultValue={empDetails.name} />
        </div>
        <div class="form-group mt-3">
          <label for="inputEmail">Email</label>
          <input onChange={(e) => { handleFormData(e) }} type="email" class="form-control col-md-3 ml-5" id="email" placeholder="Email" defaultValue={empDetails.email} />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input onChange={(e) => { handleFormData(e) }} type="password" class="form-control col-md-3 ml-3" id="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for="inputdob">Date of birth:</label>
          <input onChange={(e) => { handleFormData(e) }} type="date" class="form-control col-md-3" id="dob" value={empDetails.dob} />
        </div>
        <label>Gender</label>
        <div class="form-check">
          <input onChange={(e) => { handleFormData(e) }} class="form-check-input" type="radio" name="male" id="male" value="male" />
          <label class="form-check-label" for="exampleRadios1">
            Male
          </label>
        </div>
        <div class="form-check">
          <input onChange={(e) => { handleFormData(e) }} class="form-check-input" type="radio" name="female" id="female" value="female" />
          <label class="form-check-label" for="exampleRadios2">
            Female
          </label>
        </div>

        <div class="form-group">
          <label for="inputmMbile">Mobile</label>
          <input onChange={(e) => { handleFormData(e) }} type="number" class="form-control col-md-3" id="contact" placeholder="Mobile" defaultValue={empDetails.contact} />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input onChange={(e) => { handleFormData(e) }} type="text" class="form-control" id="address" placeholder="Apartment, studio, or floor" defaultValue={empDetails.address} />
        </div>
        <div class="form-group">
          <label>Educational Qualification</label>
          <select onChange={(e) => { handleFormData(e) }} class="custom-select" required id="education">
            <option value="">Select Qualification</option>
            <option selected="selected">{empDetails.education}</option>
            <option value="SSLC">SSLC</option>
            <option value="PLUS TWO">PLUS TWO</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
          </select>
        </div>
        <div class="form-group">
          <label>Work Experience</label>
          <select onChange={(e) => { handleFormData(e) }} class="custom-select" required id="experience">
            <option value="">Select Experience</option>
            <option selected="selected">{empDetails.experience}</option>
            <option value="Fresher">Fresher</option>
            <option value="1 year">1 year</option>
            <option value="2 year">2 year</option>
            <option value="3 year">3 year</option>
            <option value="$ year+">4 year+</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EditEmpDetails
