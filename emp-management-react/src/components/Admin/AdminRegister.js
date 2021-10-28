import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HTTP } from '../../config/axios'
import { useHistory } from 'react-router'
import './AdminRegister.css'
function AdminRegister() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const changeEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const loginHandler = (e) => {
        e.preventDefault();
        HTTP.post('/register-admin', {
            email: email,
            password: password
        }).then((data) => {
            alert("success")
            history.push('/')
        }).catch((err) => {
            alert("Login Failed")
            console.log(err);
        })
    }
    return (
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="active">Admin Register </h2>
                <form onSubmit={loginHandler}>
                    <input type="email" id="username" class="fadeIn second" name="username" placeholder="Email" onChange={changeEmailHandler} />
                    <input type="password" id="password" class="fadeIn third" name="password" placeholder="Password" onChange={changePasswordHandler} />
                    <input type="submit" class="fadeIn fourth" value="Sign Up" />
                </form>
                <div id="formFooter">
                    <Link to='/'><a className="underlineHover" href="#">Login</a></Link><br />
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
            </div>
        </div>
    )
}
export default AdminRegister
