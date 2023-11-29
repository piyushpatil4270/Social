const mongoose=require("mongoose")

const connect=async()=>{
  mongoose.connect("mongodb://127.0.0.1:27017/Socially")
  .then(()=>console.log("Server connected to mongoDB"))
  .catch((error)=>console.log("ERROR:",error))
}


module.exports=connect