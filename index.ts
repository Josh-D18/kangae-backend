const express = require("express");
const dotenv = require("dotenv");
const users = require("./src/Routes/userRoutes");
const connectToMongo = require("./src/Connect/connect");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/users", users);

app.listen(port, () => {
  connectToMongo().catch((err: Error) => console.log(err));
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
