const expressIdeaRouter = require("express");
import { Request, Response } from "express";
import { Idea } from "../../Models/Ideas/ideas";
import { User } from "../../Models/Users/users";
const router = expressIdeaRouter.Router();
const auth = require("../../Auth/auth");

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
router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const ideaCheck = await Idea.findOne({ idea: req.body.idea });
    if (ideaCheck?.idea.toLowerCase() === req.body.idea.toLowerCase()) {
      res.status(401).json({ ERROR: "Idea has already been created" });
      return;
    }
    const idea = new Idea({
      username: user,
      idea: req.body.idea,
      description: req.body.description,
      category: req.body.category,
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
router.delete("/", auth, async (req: Request, res: Response) => {
  try {
    const idea = await Idea.findByIdAndDelete({ _id: req.body.id });
    res.json(idea);
  } catch (error) {
    res.json(error);
  }
});

// Edit Idea

router.put("/edit", auth, async (req: Request, res: Response) => {
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

// Like an idea
router.put("/like", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });

    const updateIdeaLikes = await Idea.findOneAndUpdate(
      { _id: req.body.ideaID },
      {
        $push: { likes: user?._id },
      },
      { new: true }
    );

    await updateIdeaLikes?.save();
    res.json(updateIdeaLikes);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Unlike an idea
router.put("/unlike", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    const updateIdeaLikes = await Idea.findOneAndUpdate(
      { _id: req.body.ideaID },
      {
        $pull: { likes: user?._id },
      },
      { new: true }
    );

    await updateIdeaLikes?.save();
    res.json(updateIdeaLikes);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
