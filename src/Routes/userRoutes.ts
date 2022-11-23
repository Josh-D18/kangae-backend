const apps = require("express");
const router = apps.Router();
import { User } from "../Models/Users/users";

router.get("/", async (req: Request, res: Response | any) => {
  const user = new User({
    username: "JoshD",
    password: "1234",
    firstName: "Josh",
    lastName: "Date",
    bio: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum!`,
    ideas: [],
    friends: [],
    comments: [],
  });

  await user.save();

  res.send(user);
});

module.exports = router;
