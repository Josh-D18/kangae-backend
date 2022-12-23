const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import { User } from "../../Models/Users/users";
import { Comment } from "../../Models/Comments/comments";
import { Reply } from "../../Models/Replies/Replies";

// Get Replies
router.get("/", async (req: Request, res: Response) => {
  try {
    const replies = await Reply.find({});
    res.json({ replies });
  } catch (error) {
    res.json(error);
  }
});

// Get Reply

// Create Reply

router.post("/", async (req: Request, res: Response) => {
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
    res.json({ error });
  }
});

module.exports = router;
