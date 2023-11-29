import React, { useContext, useEffect, useState } from 'react'
import "./homepage.css"
import Leftbar from '../leftbar/Leftbar'
import Feed from '../feed/Feed'
import Rightbar from '../rightbar/Rightbar'
import { Usercontext } from '../../context'
import { Link } from 'react-router-dom'
const Homepage = () => {
  const context=useContext(Usercontext)
  const id=context?.user?._id
  const[friends,setfriends]=useState(null)
  const getallfriends=async()=>{
    const response= await fetch(`http://localhost:5000/user/${id}/friendlist`)
    if(response.ok){
      response.json().then((datas)=>setfriends(datas))
    }
  }
 useEffect(()=>{
  getallfriends()
 },[id])
  

  console.log("friends",context?.user)
  return (
    <div className='homepage'>
        <div className="left">
        <Leftbar />
        </div>
      <div className="feed">
      <Feed/>
      </div>
      <div className="right">
        <p className="friendsactive">All Friends</p>
        {friends?friends?.map((user)=>{
            return <Link to={`/user/${user._id}`}>
            <Rightbar image={user?.picturepath} firstname={user?.firstname} lastname={user?.lastname} />
            </Link>
          }
          
         ):(
          <>LOADING FRIENDS...</>
        )}
     
      
      </div>
      
    </div>
  )
}

export default Homepage
