import './App.css';
import {BrowserRouter,Switch,Route,Link,Redirect} from 'react-router-dom'
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import ForgotPassword from './components/Admin/ForgotPassword';
import AdminHome from './components/Admin/AdminHome';
import EmpDetails from './components/Admin/EmpDetails';
import AddEmployee from './components/Admin/AddEmployee';
import EditEmpDetails from './components/Admin/EditEmpDetails';
import ViewAllLeaves from './components/Admin/ViewAllLeaves';
import ResetPassword from './components/Admin/ResetPassword';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import EmployeeHome from './components/Employee/EmployeeHome';
import EditDetails from './components/Employee/EditDetails';
import ApplyLeave from './components/Employee/ApplyLeave';
import ViewLeaves from './components/Employee/ViewLeaves';
import ChangePassword from './components/ChangePassword/ChangePassword';
//Validating JWT token
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
