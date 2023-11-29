import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import profilepicture from "../assets/pexels-pixabay-220453.jpg";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import { Link } from "react-router-dom";
import { Usercontext } from "../../context";

const Profile = () => {
  const [user,setuser]=useState(null)
  const [posts, setposts] = useState([]);
  const [friends,setfriends]=useState(null)
  const context = useContext(Usercontext);
  const userid = context?.user?._id;

const fetchcurrentuser=async()=>{
  const response = await fetch(`http://localhost:5000/auth/${userid}`, {
      credentials: "include",
    })
    .then((response)=>response.json()
    .then((data)=>setuser(data))
    )
}

  const fetchcurrentuserpost = async () => {
    const response = await fetch(`http://localhost:5000/user/${userid}`, {
      credentials: "include",
    }).then((response) => response.json().then((datas) => setposts(datas)));
  };

 const fetchuserfriends=async()=>{
  const response= await fetch(`http://localhost:5000/user/${userid}/friends`)
  if(response.ok){
    response.json().then((datas)=>setfriends(datas))
  }
 }

  useEffect(() => {
    fetchcurrentuser()
    fetchcurrentuserpost();
    fetchuserfriends()
  }, []);
  console.log("posts-",posts);
  return (
   (user?(<div className="userprof">
   <div className="userprofilepage">
     <div className="userprofilepicture">
       <img src={profilepicture} alt="" className="profilepicture" />
       <div className="usernameinfo">
         <span className="username">{user?.firstname} {user?.lastname}</span>
       </div>
       <div className="userfriends">
         <span className="totalfriends">Friends:</span>
         <span className="totalfriends">{friends?.length}</span>
       </div>
     </div>

     <div className="userdetails">
       <div className="linkedin">
         <img src={linkedin} alt="" className="userbio" />
         <Link to="https://www.linkedin.com">
           <span className="userprofilename">www.linkedin.com</span>
         </Link>
       </div>
       <div className="linkedin">
         <img src={twitter} alt="" className="userbio" />
         <Link to="https://www.twitter.com">
           <span className="userprofilename">www.twitter.com</span>
         </Link>
       </div>
     </div>
     <span className="totalpostsname ">POSTS</span>
     <div className="userposts row ">
       {posts.map((post) => {
          return <div className="userpost col-md-3">
             <img
               src={`http://localhost:5000/${post?.postpicturepath}`}
               alt=""
               className="userpostimg"
             />
             
           </div>;
         })}
     </div>
   </div>
 </div>):(<>LOADING...</>))
  );
};

export default Profile;
