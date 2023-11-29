import { createContext, useState } from "react";

export const Usercontext=createContext()


export const Usercontextprovider=({children})=>{
    const [login,setlogin]=useState(false)
    const[user,setuser]=useState({})
    return<Usercontext.Provider value={{login,setlogin,user,setuser}}>
        {children}
     </Usercontext.Provider>
    
}

