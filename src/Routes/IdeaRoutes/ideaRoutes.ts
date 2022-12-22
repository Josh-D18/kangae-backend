const expressIdeaRouter = require("express");
import { Request, Response } from "express";
import { Idea } from "../../Models/Ideas/ideas";
import { User } from "../../Models/Users/users";
const router = expressIdeaRouter.Router();

// Get Ideas
router.get("/", async (req: Request, res: Response) => {
  try {
    const idea = await Idea.find();
    res.json(idea);
  } catch (error) {
    res.json(error);
  }
});

// Get Idea
router.get("/single", async (req: Request, res: Response) => {
  try {
    const idea = await Idea.findById({ _id: req.body.id });
    res.json(idea);
  } catch (error) {
    res.json(error);
  }
});

// Create Idea
router.post("/", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const idea = new Idea({
      username: user,
      idea: req.body.idea,
      description: req.body.description,
      category: req.body.category,
      likes: 0,
    });
    await idea.save();
    const updateUser = await User.findOneAndUpdate(
      { user },
      {
        $push: { ideas: idea?._id },
      },
      { new: true }
    );
    await updateUser?.save();
    res.json(idea);
  } catch (error) {
    res.json(error);
  }
});

// Delete Idea
router.delete("/", async (req: Request, res: Response) => {
  try {
    const idea = await Idea.findByIdAndDelete({ _id: req.body.id });
    res.json(idea);
  } catch (error) {
    res.json(error);
  }
});

// Edit Idea

router.put("/edit", async (req: Request, res: Response) => {
  try {
    const updateIdea = await Idea.findOneAndUpdate(
      { _id: req.body.id },
      {
        idea: req.body.idea,
        description: req.body.description,
        category: req.body.category,
      },
      { new: true }
    );
    await updateIdea?.save();
    res.json(updateIdea);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
