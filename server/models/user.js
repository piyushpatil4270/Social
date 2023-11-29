const mongoose=require('mongoose')
const {Schema,model} =mongoose

const userSchema=Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    picturepath:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    }

},{timestamps:true})

const USERS=model("Users",userSchema)

module.exports=USERS