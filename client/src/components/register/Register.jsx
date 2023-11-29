import React, { useState } from 'react'
import "./register.css"
import { useNavigate,Link } from 'react-router-dom'

const Register = () => {
    const[fname,setfname]=useState("")
    const[lname,setlname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[file,setfile]=useState("")
    const navigate=useNavigate()

  const registeruser=async(e)=>{
    const data=new FormData()

    data.set("lastname",lname)
    data.set("email",email)
    data.set("password",password)
    data.set("firstname",fname)
    if(file){
      data.set("file",file[0])
    }
    e.preventDefault();
    const response= await fetch("http://localhost:5000/auth/register",{
      method:"POST",
      body:data,
      credentials:"include",
      
    })
    if(response.ok){
      navigate("/login")
    }
  }
   
return (
  <form  onSubmit={registeruser}>
    <div className='register'>
        <div className="registerheader">
        <p className="tag">REGISTER</p>
        </div>
        
      <div className="name">
        <input type="text" className="firstname" placeholder='   First-name' value={fname} onChange={(e)=>setfname(e.target.value)} />
        <input type="text" className="lastname" placeholder='    Last-name' value={lname} onChange={(e)=>setlname(e.target.value)} />
      </div>
      <div className="email">
        <input type="file" className='getemail'  onChange={(e)=>{setfile(e.target.files)}} />
      </div>
      <div className="email">
        <input type="text" className="getemail" placeholder='   Email' value={email} onChange={(e)=>setemail(e.target.value)} />
      </div>
      <div className="email">
        <input type="password" className="getemail" placeholder='   Password' value={password} onChange={(e)=>setpassword(e.target.value)} />
      </div>
      <div className="submitbtn">
        <button className="submit"  >Register</button>
      </div>
      <Link to="/login"><span>Already have an account ? Log-In</span></Link>
    </div>
    </form>
  )
}

export default Register
