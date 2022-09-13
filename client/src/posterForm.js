import React, { useState } from 'react'
import { addPoster } from './Redux/postsSlice' 
import { useDispatch } from 'react-redux'
import {useRef} from 'react';
const PosterForm = () => {
    const inputRef = useRef(null)
    const dispatch=useDispatch()
     const [Image, setImage] = useState('')
      const [post, setPost] = useState({})
     const uploadImage=(e)=>{
        let File=e.target.files[0]
        setImage( File)
    };console.log(Image)
    const handleChange=(e)=>{setPost({...post,[e.target.name]:e.target.value})}
    const handleSubmit=(e)=>{  
          e.preventDefault();  
          const formData=new FormData()
         formData.append("Image",Image)
         formData.append("Title",post.Title)
        formData.append("Des",post.Des)
        dispatch(addPoster(formData))
        inputRef.current.value = null;
        setPost({Title:"",Des:""}) }

    return (
        <div class="posterForm"><form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input value={post.Title} onChange={handleChange} name="Title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Choose your Title..." />
                <label for="exampleFormControlInput1">Description</label>
                <input value={post.Des} onChange={handleChange} name="Des" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Choose your Decription..." />
                <br></br>
                <input  ref={inputRef} onChange={uploadImage} type="file"  />
                <button style={{marginLeft:'-1.8cm',backgroundColor:"gold"}} onClick={handleSubmit}  class="form-control-file" id="exampleFormControlFile1" >Submit</button>

            </div>
        </form>
        </div>
    )
}

export default PosterForm