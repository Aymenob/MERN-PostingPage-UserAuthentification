import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Post} from "../post"
import { useDispatch } from 'react-redux'
import { getPosters } from '../Redux/postsSlice'
import PosterForm from '../posterForm'
export const Posts = () => {
    const config = {
        headers: {
            Authorization : `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
      };console.log(config)
    const posts=useSelector(state=>state.posts.posts);console.log(posts)
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const authorized = useSelector(state => state.users.authorized)
    useEffect(() => {
        authorized ? navigate("/Posts") : navigate("/")
        dispatch(getPosters())
    }, [authorized])
    return (
        <div class="XContainer bg-light">
            <PosterForm/>
            <button style={{ marginRight: "0.4cm", marginTop: "0.4cm",marginBottom:"2cm", height: "1cm", width: "3cm",position: 'absolute',right: 5,top: 5, }} onClick={() => navigate("/Admin")} type="button" class="btn btn-outline-success">Go Back</button>
                    {posts.map(e=><Post Name={e.Owner.Name} Title={e.Title} Des={e.Des} Url={e.Image.Url}/>)}
                    
             </div>
        
    )
}
