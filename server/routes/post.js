const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "assets" });
const fs = require("fs");

const USERS = require("../models/user");
const POSTS = require("../models/post");
const moment=require("moment")
// upload a post
router.post("/", uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newpath=null
    if(req.file){
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
       newpath = path + "." + ext;
      fs.renameSync(path, newpath);
    }
     const { userid, description} = req.body;
    const user = await USERS.findById(userid);
    const newpost = await POSTS.create({
      userid: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      description,
      userpicturepath: user.picturepath,
      postpicturepath:newpath,
      likes: {},
      comments: [],
    });
    
  
  
  const post = await POSTS.find({});
  res.status(202).json(post);
  }
   catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});

//get post by id
router.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await POSTS.findById(id);
    res.status(202).json(post)
  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});


// get all posts of the feed
router.get("/allposts", async (req, res) => {
  try {
    const post = await POSTS.find({});
    res.status(202).json(post);
  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});

// get all posts from a user
router.get("/:userId/posts", async (req, res) => {
  try {
    const { userId } = req.params;
    const userposts = await POSTS.find({ userid: userId });
    res.status(202).json(userposts)
  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});

// like/unlike a post
router.patch("/:id/:userId/like", async (req, res) => {
  try {
    const { id,userId } = req.params;
   // const userid = req.body;
    const post = await POSTS.findById(id);
    const user=await USERS.findOne({_id:userId})
    console.log(user)
    const isliked = post.likes.get(user._id);
    if (isliked) {
      post.likes.delete(user._id);
    } else {
      post.likes.set(user._id, true);
    }
   
    const updatedpost = await POSTS.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(202).json(updatedpost);
  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});


//add comment to the post

router.patch("/:id/addcomment",uploadMiddleware.single("file"),async(req,res)=>{
  try{
    const{id}=req.params
    const {usercomment}=req.body
    const post=await POSTS.findById(id)
    const newuser=await USERS.findById(post.userid)
    const updatedpost = await POSTS.updateOne(
      {_id:id},
      
      {$push:{comments:{"comment":usercomment,"user":newuser,creatwdAt:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),}} },
      { new: true }
    );
    const newpost=await POSTS.findById(id)
    res.status(202).json(newpost.comments)
   
    

  }
  catch(error){
    
    res.status(404).json({ERROR:error.message})
  }
})

module.exports = router;
