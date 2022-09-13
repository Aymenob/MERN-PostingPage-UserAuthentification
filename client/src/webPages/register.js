import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cleanLogin, cleanPassword, registerUser,cleanName,cleanEmail } from '../Redux/userSlice'
import '../App.css';
function Register() {
    const dispatch=useDispatch()
    const Navigate=useNavigate()
    const  [newUser, setnewUser] = useState({})
    const authorized=useSelector(state=>state.users.authorized)
    const errors=useSelector(state=>state.users.errors)
    const errorsEmail=useSelector(state=>state.users.errorsEmail)
    const errorsName=useSelector(state=>state.users.errorsName)
    useEffect(() => {
        authorized?((Navigate("/Admin"))||(dispatch(cleanLogin()))):Navigate("/Register")||(dispatch(cleanLogin()))
       }, [authorized])
    return (

        <div class="bg-light" style={{height:"100vh"}}>
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
                          
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container p-4 mt-4">
                <div class="row justify-content-evenly mt-4">

                    <div class="col-lg-6 col-md-12 mt-4">
                        <div class="d-flex">
                            <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i>
                            <h2>Register</h2>
                        </div>
                        <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor:"white"}}>
                            <form>
                                <div class=" mb-3">
                                    <label class="form-label">Name</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-user"></i></span>
                                        <input  name="Name" onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});dispatch(cleanName())}} type="text" class="form-control" />
                                    </div>
                                    {errorsName?<p class="errors">{errorsName.msg||errorsName}</p>:null}
                                </div>
                                <div class=" mb-3">
                                    <label   class="form-label">Email address</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-at"></i></span>
                                        <input  name="Email" onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});dispatch(cleanEmail())}} type="text" class="form-control" />
                                    </div>
                                    {errorsEmail?<p class="errors">{errorsEmail.msg||errorsEmail}</p>:null}
                                </div>
                                <div class="mb-3">
                                    <label  class="form-label">Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-key"></i></span>
                                        <input  name="Password"  onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});dispatch(cleanPassword())}} type="password" class="form-control" />
                                    </div>
                                    {errors?<p class="errors">{errors.msg||errors}</p>:null}
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button type="submit" onClick={(e)=>{e.preventDefault();dispatch(registerUser(newUser));dispatch(cleanLogin())}} class="btn btn-outline-primary">Save <i
                                        class="fa-solid fa-floppy-disk"></i></button>
                                        <button class="btn btn-outline-danger" onClick={(e)=>{e.preventDefault();Navigate("/");dispatch(cleanLogin())}}>Login</button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Register