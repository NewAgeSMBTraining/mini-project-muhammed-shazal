import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { HTTP } from '../config/axios'

function ForgotPassword() {
    const history=useHistory()
    const [email,setEmail]=useState('')
    const changeEmailHandler=(e)=>{
        setEmail(e.target.value)
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        HTTP.post('/forgot-password',{
            email:email
        }).then((data)=>{
            console.log(data.data);
            alert(data.data.message)
        }).catch((err)=>{
            alert('Invalid Email')
        })
    }
    return (
        <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2 class="active">Enter Registered Email</h2>
          <form onSubmit={submitHandler}>
            <input type="email" id="username" class="fadeIn second" name="username" placeholder="Email" onChange={changeEmailHandler}/>
            <input type="submit" class="fadeIn fourth" value="Submit"/>
      </form>
      </div>
      </div>
    )
}

export default ForgotPassword
