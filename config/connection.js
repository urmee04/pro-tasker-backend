//load environment variables from .env file
require("dotenv").config();

//import Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

//establishes a connection to the MongoDB database
const connectDB = async () => {
  try {
    //attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    //log and exit if connection fails
    console.error("MongoDB connection error:", error);
    process.exit(1); //exit process with failure code
  }
};

//initialize the database connection
connectDB();

//export the Mongoose connection instance
module.exports = mongoose.connection;
