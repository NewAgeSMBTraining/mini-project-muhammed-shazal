import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './AdminLogin.css'
import { HTTP } from '../../config/axios'
import { Link } from 'react-router-dom'
function AdminLogin() {
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
    HTTP.post('/login', {
      username: email,
      password: password
    }).then((data) => {
      localStorage.setItem("token", data.data.token);
      history.push({
        pathname: '/admin-home',
        props: data.data
      })
    }).catch((err) => {
      alert("Login Failed")
      console.log(err);
    })
  }
  return (
    <>
      <div className="emp-login-btn">
        <Link to='/emp-login'><button className="btn btn-primary">Employee Login</button></Link>
      </div>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2 class="active">Admin LogIn </h2>
          <form onSubmit={loginHandler}>
            <input type="email" id="username" class="fadeIn second" name="username" placeholder="Email" onChange={changeEmailHandler} />
            <input type="password" id="password" class="fadeIn third" name="password" placeholder="Password" onChange={changePasswordHandler} />
            <input type="submit" class="fadeIn fourth" value="Log In" />
          </form>
          <div id="formFooter">
            <Link to='/admin-register'><a className="underlineHover" href="#">Register new admin</a></Link><br />
            <Link to='/forgot-password'><a className="underlineHover" href="#">Forgot Password?</a></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin