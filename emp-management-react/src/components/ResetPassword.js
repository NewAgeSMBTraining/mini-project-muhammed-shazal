import React, { useState } from 'react'
import { useParams } from 'react-router';
import { HTTP } from '../config/axios'

function ResetPassword() {
    const { token } = useParams()
    const [data,setData]=useState()
    const changeFormHandler=(e)=>{
        const newData={...data}
        newData[e.target.id]=e.target.value
        setData(newData)
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        HTTP.post(`/reset-password/${token}`,data).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        console.log(data);
    }
    return (
        <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2 class="active">Reset Password</h2>
          <form onSubmit={submitHandler}>
            <input type="password" id="password" class="fadeIn second" name="password" placeholder="New password" onChange={changeFormHandler}/>
            <input type="password" id="confirm_password" class="fadeIn second" name="confirm_password" placeholder="Confirm new password" onChange={changeFormHandler}/>
            <input type="submit" class="fadeIn fourth" value="Submit"/>
      </form>
      </div>
      </div>
    )
}

export default ResetPassword
