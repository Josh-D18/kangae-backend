const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import { User } from "../../Models/Users/users";
const auth = require("../../Auth/auth");

// Get Users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json({ error: error });
  }
});

// Get a user
router.get("/user", async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Friends List
router.get("/list", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const userList = user!.friends;
    res.json(userList);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Add to friends list
router.put("/addfriend", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const userList = user?.friends;

    if (userList?.includes(req.body.friendID)) {
      res.json({ Error: "Friend has already been added!" });
      return;
    } else {
      const updateFriendList = await User.findByIdAndUpdate(
        { _id: req.body.id },
        {
          $push: { friends: req.body.friendID },
        },
        { new: true }
      );

      const updateFriendListSender = await User.findOneAndUpdate(
        { _id: req.body.friendID },
        {
          $push: { friends: req.body.id },
        },
        { new: true }
      );
      res.status(201).json({ updateFriendList, updateFriendListSender });
    }
  } catch (error) {
    res.json(error);
  }
});

// Add user to requests list
router.put("/friendrequest", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.friendID });
    const userList = user?.requests;

    if (userList?.includes(req.body.id)) {
      res.json({ Error: "You have already sent a request!" });
      return;
    } else if (user?.friends.includes(req.body.id)) {
      res.json({ Error: "You already have this user as a friend!" });
      return;
    } else {
      const updateFriendRequestList = await User.findByIdAndUpdate(
        { _id: req.body.friendID },
        {
          $push: { requests: req.body.id },
        },
        { new: true }
      );

      res.json({ updateFriendRequestList });
    }
  } catch (error) {
    res.json(error);
  }
});

// Remove user from requests list
router.put(
  "/deletefriendrequest",
  auth,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById({ _id: req.body.friendID });
      const userList = user?.requests;

      if (!userList?.includes(req.body.id)) {
        res.json({ Error: "Request has already been removed!" });
        return;
      } else {
        const updateFriendList = await User.findByIdAndUpdate(
          { _id: req.body.friendID },
          {
            $pull: { requests: req.body.id },
          }
        );

        res.json({ updateFriendList });
      }
    } catch (error) {
      res.json(error);
    }
  }
);

// Delete user from friends list
router.put("/deletefriend", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const userList = user?.friends;

    if (!userList?.includes(req.body.friendID)) {
      res.json({ Error: "Friend has already been removed!" });
      return;
    } else {
      const updateFriendList = await User.findByIdAndUpdate(
        { _id: req.body.id },
        {
          $pull: { friends: req.body.friendID },
        }
      );

      const updateFriendListSender = await User.findByIdAndUpdate(
        { _id: req.body.friendID },
        {
          $pull: { friends: req.body.id },
        }
      );
      res.json({ updateFriendList, updateFriendListSender });
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
