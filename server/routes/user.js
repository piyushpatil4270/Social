const express = require("express");
//var mongoose = require('mongoose');
const { ObjectId } = require("mongodb");
const USERS = require("../models/user");
const POSTS = require("../models/post");
const router = express.Router();

//users is post and posts is user in the model
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await POSTS.find({ userid: id });
    res.json(user);
  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});

router.get("/:id/friends", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await USERS.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => USERS.findById(id))
    );
    const formattedfriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturepath }) => {
        return { _id };
      }
    );
    res.status(202).json(formattedfriends.map((id) => (id._id)));
  } catch (error) {
    res.status(404).json({ EROOR: error });
  }
});


router.get("/:id/friendlist", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await USERS.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => USERS.findById(id))
    );
    const formattedfriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturepath }) => {
        return { _id,firstname, lastname, occupation, location, picturepath};
      }
    );
    res.status(202).json(formattedfriends);
  } catch (error) {
    res.status(404).json({ EROOR: error });
  }
});

router.patch("/:id/:friendId", async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await USERS.findById(id);
    const friend = await USERS.findById(friendId);
    const isfriend=user.friends.includes(friendId)
    if (isfriend) {
   /*   user.friends.map((id)=>console.log(typeof id))
      console.log(typeof id)
      console.log(typeof friendId)*/
      user.friends = user.friends.filter((id) =>id.toString() !== friendId);
      friend.friends = friend.friends.filter((id) => id.toString() !== id);
      
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
  
    }
    await user.save();
    await friend.save();

 
    const friends = await Promise.all(
      user.friends.map((id) => USERS.findById(id))
    );

    const formattedfriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturepath }) => {
        return { _id };
      }
    );
    res.status(202).json(formattedfriends.map((id) => (id._id)));

  } catch (error) {
    res.status(404).json({ ERROR: error.message });
  }
});

module.exports = router;
