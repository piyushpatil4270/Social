import React, { useContext, useEffect, useState } from "react";
import userprofile from "../assets/pexels-pixabay-220453.jpg";
import "./createpost.css";
import { Usercontext } from "../../context";
import {Link} from "react-router-dom"
import moment from 'moment'

const Createpost = ({postid,userid,postcomments,commentlength,userimage,postimage,description}) => {
  const context=useContext(Usercontext)
  const user=context?.user
 console.log("cntxtuser",user)

  const [post,setpost]=useState(null)
  const [showcomments, setshowcomments] = useState(false);
  const [comments,setcomments] = useState(postcomments)
  const[usercomment,setusercomment]=useState("")

  
  const likepost=async()=>{
  const response= await fetch(`http://localhost:5000/post/${postid}/${user._id}/like`,{
   method:"PATCH",
  })
  .then((response)=>response.json().then((data)=>setpost(data)))
  
  }

  const postdetails=async()=>{
    const response=await fetch(`http://localhost:5000/post/${postid}/posts`,{
      
    })
    .then((response)=>response.json().then((data)=>{setpost(data)}))
  }


  const addcomment=async()=>{
    const formdata=new FormData()
    formdata.set("usercomment",usercomment)
    const response=await fetch(`http://localhost:5000/post/${post?._id}/addcomment`,{
      method:"PATCH",
      body:formdata,
    }
    
    )
    if (response.ok) {
      response.json().then((data)=>setcomments(data))
     
    }
    setusercomment("")
  }
  useEffect(()=>{
    postdetails()
  },[postid])

 const isfriend=user?.friends?.includes(userid)
 
 const Likes=post?.likes
 const isliked=(post?Boolean(Likes[user._id]):null)
 const likes=(post?Object.keys(Likes).length:null)

  return (
    <div className="postcontainer">
            <Link to={`/user/${userid}`}>
      <div className="userinfo">
  
        <img src={`http://localhost:5000/${post?.userpicturepath}`} alt="" className="userimg" />
        
        <span className="userpostname">{post?.firstname} {post?.lastname}</span>
    
      </div>
      </Link>

      <div className="postinfo">
        <Link to={`/post/${postid}`}>
        <div className="imgcontainer">
        <img src={`http://localhost:5000/${post?.postpicturepath}`} alt="" className="postimg" />
        </div>
        </Link>
        <p className="postdesc">
         {post?.description}
        </p>
      </div>
      <div className="postoptions">
        <div className="likecontainer">
        {(isliked?(<i
            className="fas fa-heart fa-xl"
            style={{ color: "#e70d5a", cursor: "pointer" }}
            onClick={()=>{
            
            likepost()
          }
          
            }
          ></i>):( <i
            className="fas fa-heart fa-xl"
            style={{ color: "#e0e0e0", cursor: "pointer" }}
            onClick={()=>{
           
              likepost()
            }}
          ></i>))}
        <span className="likes">{likes} likes</span>
        </div>
        <div className="commentcontainer">
          <i
            className="fas fa-comment fa-xl"
            style={{ color: "#276fec", cursor: "pointer" }}
            onClick={() => {
              setshowcomments(!showcomments)
           
          }}
          ></i>
          <span className="likes">{commentlength}</span>
        </div>
        <div className="sharecontainer">
          <i
            className="fas fa-share fa-xl"
            style={{ color: "#ecae27", cursor: "pointer" }}
          ></i>
          <span className="likes">2 shares</span>
        </div>
        <div className="addcomment"></div>
      </div>
      {showcomments && <div className="allcomments">
         
            <div className="cmtwritecmt" style={{display:"flex",gap:"5px",marginLeft:"25px"}}>
            <img className="cmtimg" src={`http://localhost:5000/${user?.picturepath}`} style={{height:"30px",width:"30px",borderRadius:"50%",objectFit:"cover"}}  />
            <input className="writecmtinput" style={{marginBottom:"10px"}} onChange={(e)=>setusercomment(e.target.value)} />
            <button className="addcmtbtn" style={{height:"30px",width:"50px",border:"none",backgroundColor:"limegreen",color:"white",borderRadius:"5px"}} onClick={addcomment}>Add</button>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
         {comments.map((comment) =>{
          console.log("userCMnts",comment)
            return (
             
              <div className="commentsection" style={{display:"flex",gap:"10px",marginBottom:"10px",marginTop:"10px"}} >
                 <Link to={`/user/${userid}`}>
                <img className="commentimg" src={`http://localhost:5000/${comment.user?.picturepath}`} />
                </Link>
                 <div className="writesection">
                 <Link to={`/user/${userid}`}>
                 <span className="commenttext" style={{fontWeight:"420",fontSize:"14px",marginTop:"10px",textDecoration:"none"}}>{comment.user.firstname} {comment.user.firstname}</span>
                 </Link>
                 <span className="commenttext" style={{fontWeight:"400",fontSize:"14px"}}>{comment.comment}</span>
                 <span style={{fontWeight:"500",fontSize:"14px",marginLeft:"10px",marginBottom:"10px"}} >{moment(comment.creatwdAt).fromNow()}</span>
                </div>
                
              
              </div>
           
            );
         
          })}
             </div>
         
        </div>
       
      }
     
    </div>
  );
};

export default Createpost;
