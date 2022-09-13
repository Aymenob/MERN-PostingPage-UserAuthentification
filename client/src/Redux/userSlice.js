import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const loginUser=createAsyncThunk("users/loginUser",async function (oldUser,{rejectWithValue}) {
  try{
        const {data}=await axios.post("http://localhost:8081/logginUser",oldUser)
             return data
  }//msg Errors  are set as priority messages in contorllers anyway
  catch(err){return rejectWithValue(err.response.data.msg? err.response.data.msg :err.response.data.Errors)}
  
})

export const registerUser=createAsyncThunk("users/registerUser",async function (newUser,{rejectWithValue}) {
  try{
    const {data}=await axios.post("http://localhost:8081/postUser",newUser)
    return data
  }
  catch(err){return rejectWithValue(err.response.data.msg? err.response.data.msg :err.response.data.Errors )}
})

const initialState={
 
 loading:true,
 errors:null,
 errorsEmail:null,
 errorsName:null,
 user:JSON.parse(localStorage.getItem('user')),
 token:JSON.parse(localStorage.getItem("token")),
 authorized:Boolean(localStorage.getItem("authorized"))
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cleanLogin:(state)=>{state.errors=null;state.errorsEmail=null;state.errorsName=null},
    cleanEmail:(state)=>{state.errorsEmail=null},
    cleanPassword:(state)=>{state.errors=null},
    cleanName:(state)=>{state.errorsName=null},
    logOUT:(state)=>{
      localStorage.clear()
      state.user={}
      state.token=null
      state.authorized=false
    }
  },
  extraReducers:{
  [loginUser.pending]:(state)=>{ state.loading=true},
  [loginUser.fulfilled]:(state,{payload})=>{
  state.loading=false
  state.user=payload.result
  state.token=payload.token
  state.authorized=true
  localStorage.setItem("user",JSON.stringify(payload.result))
  localStorage.setItem("token",JSON.stringify(payload.token)) 
  localStorage.setItem("authorized",true)
  
  },
  [loginUser.rejected]:(state,{payload})=>{
  state.loading=false
  if (typeof(payload)==="string") {
    payload.includes("Email")?state.errorsEmail=payload:state.errors=null
    payload.includes("Password")?state.errors=payload:state.errors=null
  } else {
    payload.map(e=>e.param==="Email"?state.errorsEmail=e:null)
    payload.map(e=>e.param==="Password"?state.errors=e:null)
  } },
  [registerUser.pending]:(state)=>{ state.loading=true},
  [registerUser.fulfilled]:(state,{payload})=>{
    state.loading=false
    state.user=payload.result
    state.token=payload.token
    state.authorized=true
    localStorage.setItem("user",JSON.stringify(payload.result))
    localStorage.setItem("token",JSON.stringify(payload.token)) 
    localStorage.setItem("authorized",true)
    
    },
    
    [registerUser.rejected]:(state,{payload})=>{
      state.loading=false
      
      if (typeof(payload)==="string") {
        payload.includes("Email")?state.errorsEmail=payload:state.errors=null
      } else {
        payload.map(e=>e.param==="Email"?state.errorsEmail=e:null)
        payload.map(e=>e.param==="Password"?state.errors=e:null)
        payload.map(e=>e.param==="Name"?state.errorsName=e:null)
      } }

 
  }
})


export const {cleanLogin,logOUT,cleanEmail,cleanPassword,cleanName } = userSlice.actions

export default userSlice.reducer