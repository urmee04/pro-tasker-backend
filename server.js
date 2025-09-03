const express = require("express");
const db = require("./config/connection"); //database connection configuration
const routes = require("./routes"); //API routes
require("dotenv").config(); //load environment variables from .env file

const app = express(); //initialize Express application
const PORT = process.env.PORT || 3001; //use environment port or default to 3001

//middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));
//middleware to parse JSON data from requests
app.use(express.json());
//register all API routes
app.use(routes);

//wait for database connection to open before starting server
db.once("open", () => {
  //start Express server on specified port
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
