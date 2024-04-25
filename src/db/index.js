const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/latestdb";

const connectDB = async () => {
  mongoose
    .connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to Mongo!");
    })
    .catch((err) => {
      console.error("Error connecting to Mongo", err);
    });
};

module.exports = connectDB;