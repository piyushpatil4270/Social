import React from 'react'
import "./rightbar.css"

import userprofile from "../assets/pexels-pixabay-220453.jpg";
const Rightbar = (props) => {
  return (
    <div className='right'>
      
      <div className="rightcomponent">
        <img className="friendimg" src={`http://localhost:5000/${props.image}`} alt='' />
        <span className="friendname">{props.firstname} {props.lastname}</span>
      </div>
    </div>
  )
}

export default Rightbar
