const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.PASSWORD}@cluster0.63g31.mongodb.net/test`;

// Create a storage object with a given configuration
const storage = new GridFsStorage({ uri });

// Set multer storage engine to the newly created object
const upload = multer({ storage });

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "kangae-server",
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
