const express = require("express");
import { Request, Response } from "express";
import { Comment } from "../../Models/Comments/comments";
import { Reply } from "../../Models/Replies/Replies";
import { User } from "../../Models/Users/users";
const router = express.Router();
const auth = require("../../Auth/auth");

// Get Replies
router.get("/", async (req: Request, res: Response) => {
  try {
    const replies = await Reply.find({});
    res.json({ replies });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Reply
router.get("/single", async (req: Request, res: Response) => {
  try {
    const reply = await Reply.findById({ _id: req.body.id });
    res.json({ reply });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Create Reply
router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const comment = await Comment.findById({ _id: req.body.commentID });
    const reply = new Reply({
      reply: req.body.reply,
      user,
      comment,
    });

    const updateCommentReplyList = await Comment.findByIdAndUpdate(
      { _id: req.body.commentID },
      {
        $push: { replies: reply._id },
      }
    );
    await reply.save();
    res.json({ reply, updateCommentReplyList });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
