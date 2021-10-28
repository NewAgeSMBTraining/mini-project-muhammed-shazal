import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HTTP } from '../../config/axios'
import { useHistory } from 'react-router'
import { MDBDataTable } from 'mdbreact';
import './AdminHome.css'
function AdminHome(props) {
    const history=useHistory()
    const [emplist, setEmplist] = useState([])
    const [reload, setReload] = useState(false)
    useEffect(() => {
        HTTP.get('/list-employees').then((data) => {
            setEmplist(data.data)
        })
    }, [reload])
    const deleteUser = (id) => {
        HTTP.delete(`/delete-employee/${id}`).then((data) => {
            setReload(!reload)
        }).catch((err) => {
            console.log(err);
        })
    }
    const blockOrUnblockUser = (id) => {
        HTTP.post(`/block-or-unblock-user/${id}`).then((data) => {
            setReload(!reload)
        }).catch((err) => {
            console.log(err);
        })
    }
    const signOut=(e)=>{
        localStorage.removeItem('token')
        history.push('/')
      }
      const setDatas = () => {
        const data = {
            columns: [
                {
                    label: 'Sl.no',
                    field: 'sl_no',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        emplist && emplist.map((emp,key) => {
            data.rows.push({
                sl_no:key+1,
                name:emp.name,
                email:emp.email,
                actions:<>          
                            <Link to={{ pathname: '/emp-details', props: { id: emp._id } }}><button className="btn btn-primary">Details</button></Link>
                            <Link to={{ pathname: '/edit-emp-details', props: emp }}><button className="btn btn-info ml-2">Edit</button></Link>
                            <button className="btn btn-danger ml-2" onClick={() => deleteUser(emp._id)}>Delete</button>
                            <button className="btn btn-dark ml-2" onClick={() => blockOrUnblockUser(emp._id)}>{emp.block == true ? 'Unblock' : 'Block'}</button>               
                    </>
            })
        })
        return data;
    }
    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/add-employee"><a class="navbar-brand">Add Employee</a></Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link to="/view-all-leaves"><a class="navbar-brand" href="#">View Leaves</a></Link>
                            </li>
                            <li class="nav-item active">
                                <Link to={{ pathname: '/change-password', props: props.location.props }}><a class="navbar-brand" href="#">Change Password</a></Link>
                            </li>
                        </ul>
                    </div>
                    <form class="form-inline my-2 my-lg-0">
                        <button onClick={signOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Out</button>
                    </form>
                </nav>
            </div>
            <div>
                <h1 className="text-center m-4">All Employees</h1>
                <MDBDataTable
                data={setDatas()}
                className="px-3 "
                bordered
                striped
                hover
                info={false}
                paging={false}
            />
                {/* <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sl.no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emplist.map((item, key) => {
                            return (<tr>
                                <th scope="row">{key + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Link to={{ pathname: '/emp-details', props: { id: item._id } }}><button className="btn btn-primary">Details</button></Link>
                                    <Link to={{ pathname: '/edit-emp-details', props: item }}><button className="btn btn-info ml-2">Edit</button></Link>
                                    <button className="btn btn-danger ml-2" onClick={() => deleteUser(item._id)}>Delete</button>
                                    <button className="btn btn-dark ml-2" onClick={() => blockOrUnblockUser(item._id)}>{item.block == true ? 'Unblock' : 'Block'}</button></td>
                            </tr>)
                        })}
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}

export default AdminHome
