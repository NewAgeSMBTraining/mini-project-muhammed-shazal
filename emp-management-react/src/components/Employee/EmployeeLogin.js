import React, { useState } from 'react'
import { HTTP } from '../../config/axios'
import { useHistory } from 'react-router'
import './EmployeeLogin.css'
import { Link } from 'react-router-dom'
function EmployeeLogin() {
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
    HTTP.post('/users/login', {
      username: email,
      password: password
    }).then((data) => {
      localStorage.setItem("token", data.data.token);
      history.push({
        pathname: '/emp-home',
        props: data.data.user
      })
    }).catch((err) => {
      alert('Login Failed')
      console.log(err);
    })
  }
  return (
    <>
      <div className="admin-login-btn">
        <Link to='/'><button className="btn btn-primary">Admin Login</button></Link>
      </div>
      <div>
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <h2 class="active">Employee LogIn </h2>
            <form onSubmit={loginHandler}>
              <input type="email" id="username" class="fadeIn second" name="username" placeholder="Email" onChange={changeEmailHandler} />
              <input type="password" id="password" class="fadeIn third" name="password" placeholder="Password" onChange={changePasswordHandler} />
              <input type="submit" class="fadeIn fourth" value="Log In" />
            </form>
            <div id="formFooter">
              <a className="underlineHover" href="#">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeLogin
