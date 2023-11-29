import React from "react";
import "./leftbar.css";
import { Link } from "react-router-dom";
const Leftbar = () => {
  return (
    <div className="leftside">
      <div className="outcontainer">
        <Link to="/">
        <div className="leftsidecontainer">
          
          <i className="fa-solid fa-house fa-xl " style={{color: "#22437c"}}   ></i>

          <span className="leftsidename">Home</span>
         
        </div>
        </Link>
      </div>
      
      <div className="outcontainer">
      <Link to="/liked">
        <div className="leftsidecontainer">
          <i className="fa-solid fa-thumbs-up fa-xl"  style={{color: "#9a309c"}}></i>
          <span className="leftsidename">Liked</span>
        </div>
       </Link>
      </div>
      <div className="outcontainer">
      <Link to="/saved">
        <div className="leftsidecontainer">
          <i className="fa-solid fa-bookmark fa-xl" style={{color: "#d83013"}}></i>
          <span className="leftsidename">Saved</span>
        </div>
        </Link>
      </div>
      <div className="outcontainer">
      <Link to="/myprofile">
        <div className="leftsidecontainer">
          <i className="fa-solid fa-user fa-xl" style={{color: "#23e1bb"}}></i>
          <span className="leftsidename">My Profile</span>
         
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Leftbar;
