import React, { useContext, useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { Usercontext } from '../../context'
const Login = () => {
  const context=useContext(Usercontext)
 const[email,setemail]=useState("")
 const[password,setpassword]=useState("")
 const navigate=useNavigate()
const loginuser=async(e)=>{
  const data= new FormData()
  data.set("email",email)
  data.set("password",password)
  e.preventDefault();
 const response=await fetch("http://localhost:5000/auth/login",{
  method:"POST",
  body:JSON.stringify({email,password}),
  headers: {"Content-Type": "application/json"},
  credentials:"include"
 })
if(response.ok){
  response.json().then((response)=>context?.setuser(response.USER))

  context.setlogin(true)
  navigate("/home")
 }
 
 }
 console.log("USER",context.user)
  return (
    <form onSubmit={loginuser} >
   <div className='register'>
    <div className="registerheader">
    <p className="tag">Login</p>
    </div>
  
  <div className="email">
    <input type="text" className="getemail" placeholder='   Email' value={email} onChange={(e)=>setemail(e.target.value)}  />
  </div>
  <div className="email">
    <input type="password" className="getemail" placeholder='   Password' value={password} onChange={(e)=>setpassword(e.target.value)}  />
  </div>
  <div className="submitbtn">
    <button className="submit">Login</button>
  </div>
  <Link to="/register"><span>Don't have Account? Sign-Up</span></Link>
</div>
</form>
  )
}

export default Login
