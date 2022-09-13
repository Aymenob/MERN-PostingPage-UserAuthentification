
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/userSlice'
import { cleanLogin,cleanEmail,cleanPassword } from '../Redux/userSlice';
import '../App.css';
function Login() {
    const Navigate=useNavigate()
    const authorized=useSelector(state=>state.users.authorized)
    const errors=useSelector(state=>state.users.errors)
    const errorsEmail=useSelector(state=>state.users.errorsEmail)
   
        //console.log(errors[1].msg)
   
    useEffect(() => {
     authorized?((Navigate("/Admin"))||(dispatch(cleanLogin()))):Navigate("/")||(dispatch(cleanLogin()))
    }, [authorized])
    
    const dispatch=useDispatch()
   
    const  [newUser, setnewUser] = useState({})
    return (
        <div class="bg-light" style={{ height: "100vh" }}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                </div>
            </nav>
        <div class="container p-4 mt-4">

                <div class="row justify-content-evenly mt-4">
                    <div class="col-lg-6 col-md-12 mt-4">
                        <div class="d-flex">
                            <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i>
                            <h2>Login</h2>
                        </div>
                        <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{ backgroundColor: "white" }}>
                            <form>
                                <div class=" mb-3">
                                    <label class="form-label">Email address</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-at"></i></span>
                                        <input name="Email" type="text" onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});dispatch(cleanEmail())}} class="form-control" />
                                    </div>
                                    {errorsEmail?<p class="errors" >{errorsEmail.msg||errorsEmail}</p>:null}
                                </div>
                                <div class=" mb-3">
                                    <label class="form-label">Password:</label><span style={{fontSize:"14px"}}> Must contain 6 digits</span>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-key"></i></span>
                                        <input type="password" name="Password" onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});dispatch(cleanPassword())}}  class="form-control" />      
                                    </div>
                                    {errors?<p class="errors">{errors.msg||errors}</p>:null}
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button type="submit" onClick={(e)=>{e.preventDefault();dispatch(loginUser(newUser))}} class="btn btn-outline-primary"> Login <i class="fa-solid fa-floppy-disk"></i></button>
                                    <span class="register">dont have an account ? </span><button class="btn btn-outline-success" onClick={()=>{Navigate("/Register");dispatch(cleanLogin())}}>Register</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login