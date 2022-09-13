import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { cleanLogin, logOUT } from '../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
function Admin() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const authorized=useSelector(state=>state.users.authorized)
    const Name=useSelector(state=>state.users.user.Name)
    const Email=useSelector(state=>state.users.user.Email)
    
    useEffect(() => {
        authorized?((navigate("/Admin"))||(dispatch(cleanLogin()))):navigate("/")
       }, [authorized])
    return (

        <div class="bg-light" style={{ height: "100vh" }}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            </li>
                        </ul>
                        <div class="d-flex">
                            <div class="mx-4">
                              <button style={{marginRight:"0.4cm"}} onClick={()=>navigate("/Posts")} type="button" class="btn btn-outline-success">Posts</button>
                                <button class="btn btn-outline-primary" onClick={()=>{dispatch(logOUT());navigate("/")}}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container p-4 mt-4">
                <div class="row justify-content-evenly mt-4">

                    <div class="col-lg-12 col-md-12 mt-4">
                        <div class="d-flex">
                            <i class="fa-solid fa-user fs-1 mx-2"></i> <h2>Profiles list</h2>
                        </div>
                        <div class="shadow-lg p-3 mb-5 bg-body rounded" style={{ backgroundColor: "white" }}>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">email</th>
                                        <th scope="col">role</th>
                                        <th scope="col">telephone</th>
                                        <th scope="col">city</th>
                                        <th scope="col">country</th>
                                        <th scope="col">bio</th>
                                        <th scope="col">actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>{Name}</th>
                                        <td>{Email}</td>
                                        <td>ADMIN</td>
                                        <td>56666666</td>
                                        <td>tunisia</td>
                                        <td>tunisia</td>
                                        <td>im full stack developer</td>
                                        <td><button class="btn btn-outline-danger">Delete</button></td>
                                        
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Admin