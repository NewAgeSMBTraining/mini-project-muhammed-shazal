import logo from './logo.svg';
import './App.css';
import AdminLogin from './components/AdminLogin';
import {BrowserRouter,Switch,Route,Link,Redirect} from 'react-router-dom'
import AdminHome from './components/AdminHome';
import EmpDetails from './components/EmpDetails';
import AddEmployee from './components/AddEmployee';
import EditEmpDetails from './components/EditEmpDetails';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import EmployeeHome from './components/Employee/EmployeeHome';
import EditDetails from './components/Employee/EditDetails';
import ApplyLeave from './components/Employee/ApplyLeave';
import ViewLeaves from './components/Employee/ViewLeaves';
import ViewAllLeaves from './components/ViewAllLeaves';
import AdminRegister from './components/AdminRegister';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {
  const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => 
          (localStorage.getItem("token")?<Component {...props} />:<Redirect to="/" />
        )} />
    );
  }
  return (
    <div className='app'>
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={AdminLogin}/>
    <Route exact path='/admin-register' component={AdminRegister}/>
    <Route exact path='/emp-login' component={EmployeeLogin}/>
    <Route exact path='/forgot-password' component={ForgotPassword}/>
    <PrivateRoute exact path='/admin-home' component={AdminHome}/>
    <PrivateRoute exact path='/emp-details' component={EmpDetails}/>
    <PrivateRoute exact path='/add-employee' component={AddEmployee}/>
    <PrivateRoute exact path='/edit-emp-details' component={EditEmpDetails}/>
    <PrivateRoute exact path='/emp-home' component={EmployeeHome}/>
    <PrivateRoute exact path='/edit-details' component={EditDetails}/>
    <PrivateRoute exact path='/apply-leave' component={ApplyLeave}/>
    <PrivateRoute exact path='/view-leaves' component={ViewLeaves}/>
    <PrivateRoute exact path='/view-all-leaves' component={ViewAllLeaves}/>
    <PrivateRoute exact path='/change-password' component={ChangePassword}/>
    <Route exact path = '/password/reset/:token' component = {ResetPassword} />
    </Switch>
    </BrowserRouter>
    </div>

  );
}

export default App;
