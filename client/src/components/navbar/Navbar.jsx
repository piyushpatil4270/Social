import React, { useContext, useEffect, useState } from "react";
import Socialicon from "../assets/4691240_instagram_icon.png";
import userprofile from "../assets/pexels-pixabay-220453.jpg";
import "./navbar.css";
import { Usercontext } from "../../context";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const context = useContext(Usercontext);
  const login = context.login;
  const userimage = context?.user?.picturepath;

  const navigate = useNavigate();


  const logout = () => {
    context.setlogin(false);
    context.setuser(null);
    navigate("/");
  };
  return (
    <>
      <div className="navbarcss">
        <div className="leftbar">
          <div className="iconcontainer">
            <img src={Socialicon} className="socialicon" />
          </div>

          <span className="appname">Be-Social</span>
        </div>
        {login && (
          <div className="middlebar">
            <div className="search">
              <input
                type="text"
                className="searchbar"
                placeholder="   Search"
              />
              <i
                className="fa-solid fa-magnifying-glass fa-xl"
                style={{ color: "black", margin: "15px" }}
              ></i>
            </div>
          </div>
        )}
        {login && (
          <div className="rightnavbar">
            <div className="profile">
              <div className="userprofile">
                <img
                  src={`http://localhost:5000/${userimage}`}
                  alt=""
                  className="profile"
                />
                <i
                  className="fa-solid fa-right-from-bracket fa-xl"
                  onClick={logout}
                ></i>
              </div>
            </div>
          </div>
        )}
      </div>

      <div></div>
    </>
  );
};

export default Navbar;
