const expressCommentRouter = require("express");
import { Request, Response } from "express";
import { Comment } from "../../Models/Comments/comments";
import { Idea } from "../../Models/Ideas/ideas";
import { User } from "../../Models/Users/users";
const auth = require("../../Auth/auth");
const router = expressCommentRouter.Router();

// Get Comments
router.get("/", async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({});
    res.json({ comments });
  } catch (error) {
    res.json({ error });
  }
});

// Get Comment
router.get("/single", async (req: Request, res: Response) => {
  try {
    const comment = await Comment.find({ _id: req.body.id });
    res.json({ comment });
  } catch (error) {
    res.json({ error });
  }
});

// Create Comment
router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const comment = new Comment({
      username: user,
      comment: req.body.comment,
    });
    const updateUserCommentList = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $push: { comments: req.body.ideaID },
      }
    );
    const updateIdeaCommentList = await Idea.findByIdAndUpdate(
      { _id: req.body.ideaID },
      {
        $push: { comments: req.body.ideaID },
      }
    );
    await comment.save();
    res.json({ comment, updateUserCommentList, updateIdeaCommentList });
  } catch (error) {
    res.json(error);
  }
});

// Edit Comment

module.exports = router;
