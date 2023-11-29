const express=require("express")
const connect = require("./connection/connect")
const authrouter=require("./routes/auth")
const userrouter=require("./routes/user")
const postrouter=require("./routes/post")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const bodyparser=require("body-parser")

const app=express()
const port=5000
app.use('/assets',express.static(__dirname+'/assets'))

connect()
app.use(cookieparser())
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(express.json())
app.use(bodyparser.json())

app.use("/auth",authrouter)
app.use("/user",userrouter)
app.use("/post",postrouter)


app.listen(port,()=>console.log(`Server started on port ${port}`))