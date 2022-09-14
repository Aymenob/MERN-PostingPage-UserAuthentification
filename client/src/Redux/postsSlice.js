import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPosters=createAsyncThunk("posters/getPosters",async function (_,{rejectWithValue}) {

  try{
    let reqInstance = axios.create( {
        headers: {
            token : JSON.parse(localStorage.getItem("token"))
            }
      })
        
        
        const {data}=await reqInstance.get("http://localhost:8081/getPosters")
    return data
}
    catch(err){return rejectWithValue(err.response.data.msg)}
})
export const addPoster=createAsyncThunk("addPoster/posters",async function (formData,{rejectWithValue,dispatch}) {

    try {
        let reqInstance = axios.create( {
            headers: {
                token : JSON.parse(localStorage.getItem("token"))
                }
          })
        const {data}=await reqInstance.post("http://localhost:8081/Poster",formData)
        dispatch(getPosters())
        return data
    } catch (err) {return rejectWithValue(err.response.data.msg)}
})


const initialState={
    loading:false,
    errors:null,
    posts:[],  
}
const postsSlice = createSlice({
    name: 'posters',
    initialState,
    reducers: {
     },
     extraReducers:{
     [getPosters.pending]:(state)=>{
        state.loading=true
    },
     [getPosters.fulfilled]:(state,{payload})=>{
     state.loading=false
     state.posts=payload
     },
     [getPosters.rejected]:(state,{payload})=>{
      state.errors=payload
     },
     [addPoster.pending]:(state)=>{
        state.loading=true
     },
     [addPoster.fulfilled]:(state,{payload})=>{
        state.loading=false
        state.posts.push(payload)
     },
     [addPoster.rejected]:(state,{payload})=>{
        state.errors=payload
     }
     }
  })
  
  //export const {  } = postsSlice.actions
  export default postsSlice.reducer