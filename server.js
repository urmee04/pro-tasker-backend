//import required modules
const express = require("express");
const db = require("./config/connection"); //MongoDB connection
const routes = require("./routes"); //API routes
const cors = require("cors");
require("dotenv").config(); //load environment variables

//initialize Express application
const app = express();
//set port from environment variable or default to 3001
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies/from data
app.use(express.json()); // Parse JSON bodies

//CORS configuration for cross-origin requests
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://pro-tasker-frontend-sxmf.onrender.com",
    ], //allow frontend dev servers
    credentials: true, //allow cookies/auth headers to be sent
  })
);

//test/health check route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Taskmaster Backend API" });
});

//mount all API routes with /api prefix
app.use("/api", routes);

//start server only after database connection is established
db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
