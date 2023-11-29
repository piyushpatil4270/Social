import React, { useContext, useEffect, useState } from 'react'
import {useParams,Link} from "react-router-dom"
import { Usercontext } from '../../context'
import "./postcomponent.css"
const Postcomponent = () => {
  const {id} = useParams()
  const context=useContext(Usercontext)
  const userid=context?.user?._id
  const [post,setpost]=useState(null)
  
  console.log("post",post)

 const likepost=async()=>{
  const response= await fetch(`http://localhost:5000/post/${id}/${userid}/like`,{
    method:"PATCH"
  })
  .then((response)=>response.json()
  .then((data)=>setpost(data))
  )
 }

 const fetchpost=async(e)=>{
   const response= await fetch(`http://localhost:5000/post/${id}/posts`)
   .then((response)=>response.json()
   .then((data)=>setpost(data)))
    
 }
 useEffect(()=>{
  fetchpost()
 },[])
 const Likes=post?.likes
 const isliked=(post?Boolean(Likes[userid]):null)
 const likes=(post?Object.keys(Likes).length:null)
 console.log("LIKES",isliked)
 console.log("posttt",Likes)
  return (
    (post?(<div className='onepost'>
      <Link to={`/user/${post?.userid}`}>
    <div className="onepostuser">
      <img src={`http://localhost:5000/${post.userpicturepath}`} alt="" className="onepostuserimg" />
      <span className="onepostusername">{post.firstname} {post?.lastname}</span>
    </div>
    </Link>
    <div className="onepostpost">
      <img src={`http://localhost:5000/${post?.postpicturepath}`} alt="" className="onepostpostimg" />
    </div>
    <div className="onepostdesc">
      <span className="onepostdescription">{post?.description}</span>
    </div>
    <div className="oneposticons">
      <div>
        {isliked ?(<> <i className="fas fa-heart fa-xl"
            style={{ color: "#e70d5a", cursor: "pointer",marginTop:"10px",marginLeft:"5px" }}
            onClick={()=>{
              likepost()
            }}
          ></i>
          <span className="oneposticonstotal">{likes} likes</span> </>):(
           <> <i className="fas fa-heart fa-xl"
          style={{ color: "#e0e0e0", cursor: "pointer",marginTop:"10px",marginLeft:"5px" }}
          onClick={()=>{
            likepost()
          }}
        ></i>
        <span className="oneposticonstotal">{likes} likes</span> </>
          )}
          </div> 
          <div>
    <i className="fas fa-comment fa-xl"
            style={{ color: "#276fec", cursor: "pointer",marginTop:"10px",marginLeft:"5px" }}
            
    ></i>
    <span className="oneposticonstotal">comments</span>
    </div>
    </div>
    </div>):(<>Loading...</>))
  )
}

export default Postcomponent
