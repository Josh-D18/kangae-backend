const expressCommentRouter = require("express");
import { Request, Response } from "express";
import { Comment } from "../../Models/Comments/comments";
import { Idea } from "../../Models/Ideas/ideas";
import { User } from "../../Models/Users/users";
const router = expressCommentRouter.Router();

// Get Comments
router.get("/", async (req: Request, res: Response) => {
  try {
    const comment = Comment.find({});
    res.json({ comment });
  } catch (error) {
    res.json({ error });
  }
});

// Get Comment
router.get("/single", async (req: Request, res: Response) => {
  try {
    const comment = Comment.find({ _id: req.body.id });
    res.json({ comment });
  } catch (error) {
    res.json({ error });
  }
});

// Create Comment
router.post("/", async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.body.id });
  try {
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
