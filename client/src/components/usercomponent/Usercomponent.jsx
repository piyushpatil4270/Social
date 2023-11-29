import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import "./usercomponent.css";
import { Usercontext } from "../../context";

const Usercomponent = () => {
  const { id } = useParams();
  
  const context = useContext(Usercontext);
  const currentuserid = context?.user?._id;
  console.log("currid", currentuserid);
  console.log("context-user", context?.user);
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState(null);

  const [allfriends, setallfriends] = useState(null);

  //add friend

  const addfriend = async (e) => {
    const response = await fetch(
      `http://localhost:5000/user/${currentuserid}/${id}`,
      {
      method: "PATCH",
      }
    ).then((data) => data.json().then((data) => setallfriends(data)));
  };
  //current user
  const fetchcurrentuser = async (e) => {
    const response = await fetch(`http://localhost:5000/user/${id}`, {
      credentials: "include",
    }).then((response) => response.json().then((datas) => setposts(datas)));
  };
  //currentuser posts
  const fetchcurrentuserposts = async (e) => {
    const response = await fetch(`http://localhost:5000/auth/${id}`, {
      credentials: "include",
    }).then((response) => response.json().then((datas) => setuser(datas)));
  };
  const fetchcurrentuserfriends = async () => {
    const response = await fetch(
      `http://localhost:5000/user/${currentuserid}/friends`
    ).then((response) => response.json().then((data) => setallfriends(data)));
  };
  useEffect(() => {
    fetchcurrentuser();
    fetchcurrentuserposts();
    fetchcurrentuserfriends();
  }, []);

  console.log("currid", currentuserid,id);
  console.log("all friends", allfriends);

  return posts && allfriends && user ? (
    <div>
      <div className="userprof">
        <div className="userprofilepage" style={{height:"calc(100vh - 50px)"}}>
          <div className="userprofilepicture">
            <img
              src={`http://localhost:5000/${user?.picturepath}`}
              alt=""
              className="profilepicture"
            />
            <div className="usernameinfo">
              <span className="username">
                {user?.firstname} {user?.lastname}
              </span>
            </div>
            <div className="userfriends">
              <span className="totalfriends">Friends:</span>
              <span className="totalfriends">
                {allfriends ? Object.keys(allfriends).length : null}
              </span>
            </div>
            {currentuserid !== id && (
              <div className="userfriends">
                {allfriends?.includes(id) ? (
                  <i
                    class="fa-solid fa-user-minus fa-xl"
                    style={{ color: "#000000", margin: "0px" }}
                    onClick={addfriend}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-user-plus fa-xl"
                    style={{ color: "#030303", margin: "0px" }}
                    onClick={addfriend}
                  ></i>
                )}
              </div>
            )}
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
              return (
                <div className="userpost col-md-3">
                  <Link to={`/post/${post?._id}`}>
                    <img
                      src={`http://localhost:5000/${post?.postpicturepath}`}
                      alt=""
                      className="userpostimg"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>LOADING...</>
  );
};

export default Usercomponent;
