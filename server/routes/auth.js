const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "assets" });
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");
const USERS = require("../models/user");
const secret = "12245jsjjjs78dbsns";

router.post("/register", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      occupation,
      location,
      picturepath,
    } = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    const newuser = await USERS.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      occupation,
      location,
      picturepath: newpath,
    });
    res.status(202).json(newuser);
  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USERS.findOne({ email });
    const passed = bcrypt.compareSync(password, user.password);
    if (passed) {
      const token = jwt.sign({ user, id:user._id }, secret);
      console.log(token)
      res.cookie("token",token).json({TOKEN:token,USER:user});
      
    } else {
      res.status(404).json("Wrong Credentials");
    }
  } catch (error) {
    res.json({ ERROR: error.message });
  }
});


router.get("/:id",async(req,res)=>{
  try {
    const {id}=req.params
    const user=await USERS.findById(id)
    res.status(202).json(user)
    
  } catch (error) {
    res.status(404).json({ERROR:error.message})
  }
})
module.exports = router;
