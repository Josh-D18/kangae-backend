const express = require("express");
const dotenv = require("dotenv");
const users = require("./src/Routes/UserRoutes/userRoutes");
const ideas = require("./src/Routes/IdeaRoutes/ideaRoutes");
const comments = require("./src/Routes/CommentRoutes/commentRoutes");
const replies = require("./src/Routes/ReplyRoutes/replyRoutes");
const signup = require("./src/Auth/signup");
const login = require("./src/Auth/login");
const connectToMongo = require("./src/Connect/connect");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/ideas", ideas);
app.use("/api/comments", comments);
app.use("/api/replies", replies);
app.use("/api/signup", signup);
app.use("/api/login", login);

app.listen(port, () => {
  connectToMongo().catch((err: Error) => console.log(err));
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
