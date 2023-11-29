import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import userprofile from "../assets/pexels-pixabay-220453.jpg";
import Createpost from "../createpost/Createpost";
import { Usercontext } from "../../context";



const Feed = (e) => {
  const context = useContext(Usercontext);
  const [allposts, setallposts] = useState([]);
  const profilepicture = context?.user?.picturepath;
  const [file, setfile] = useState("");
  const [description, setdescription] = useState("");
  const userid = context?.user?._id;
  
  const addpost = async (e) => {
    
    const formdata = new FormData();
    formdata.set("userid", userid);
    formdata.set("description", description);
    formdata.set("file", file);
    console.log("formdata",file)
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/post`, {
      method: "POST",
      body: formdata,
    });
    if (response.ok) {
      response.json().then((data)=>setallposts(data))
      setfile("")
      setdescription("");
    }
  }
  const fetchallposts=async()=>{
    const userrespose = await fetch("http://localhost:5000/post/allposts", {
      method: "GET",
    })
    .then((response)=>response.json()
    .then((data)=>setallposts(data))
    )
  }


  useEffect(() => {
    fetchallposts()
    console.log("allposts",allposts)
  });
  console.log("allpsts",allposts)

  return (
    <div className="feed">
      <div className="createnewpost">
        <div className="post">
          <img
            src={`http://localhost:5000/${profilepicture}`}
            alt=""
            className="profileimg"
          />
          <input
            className="description"
            placeholder="  What's in your mind ?"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
          <i
            className="fa-solid fa-plus fa-xl addicon"
            style={{ marginTop: "25px", marginLeft: "15px" }}
            onClick={addpost}
          ></i>
        </div>
        <hr className="hrtag" />
        <div className="postoptions">
          <div className="optioncontainer">
            <i class="fa-solid fa-video fa-xl" style={{ color: "#fb7f2d" }}></i>
            <span className="optionname">Go Live</span>
          </div>
          <div className="optioncontainer">
            <label htmlFor="postimgcont">
              <i
                class="fa-solid fa-image fa-xl"
                style={{ color: "#1fb244" }}
              ></i>
            </label>
            <input
              type="file"
              id="postimgcont"
              onChange={(e) => {
                setfile(e.target.files[0])
                 console.log(file)}}
              style={{ display: "none" }}
            />

            <span className="optionname">Photo</span>
          </div>
          <div className="optioncontainer">
            <i
              class="fa-solid fa-clapperboard fa-xl"
              style={{ color: "#d3c527" }}
            ></i>
            <span className="optionname">Video</span>
          </div>
          <div className="optioncontainer">
            <i
              class="fa-solid fa-face-smile fa-xl"
              style={{ color: "#f90101" }}
            ></i>
            <span className="optionname">Feeling</span>
          </div>
        </div>
      </div>
      <div className="allposts">
         {allposts ? allposts?.map((post)=>{
            console.log("allcmts",post.comments)
          return <Createpost postid={post._id} userid={post.userid} likes={Object.keys(post.likes).length} postcomments={post.comments}  commentlength={post?.comments?.length} userimage={post.userpicturepath} postimage={post.postpicturepath} description={post.description} />
         }):<>LOADING...</>}
        
        
        
      </div>
    </div>
  );
};

export default Feed;
