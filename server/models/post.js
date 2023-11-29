const mongoose = require("mongoose")
const {Schema,model} = mongoose


const postSchema=Schema({
 userid:{
    type:String,
    required:true
 },
 firstname:{
    type:String,
    required:true
 },
 lastname:{
    type:String,
    required:true
 },
 location:String,
 description:String,
 postpicturepath:{
   type:String,
  
 },
 userpicturepath:String,
 likes:{
    type:Map,
    of:Boolean
 },
 comments:{
    type:Array,
    default:[]
 }

},{timestamps:true})

const POSTS= model("posts",postSchema)

module.exports=POSTS