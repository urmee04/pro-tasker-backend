const router = require("express").Router();
const apiRoutes = require("./api");

//API routes - all routes in the api directory will be prefixed with /api
router.use("/api", apiRoutes);
//404 handler for any requests to undefined routes
router.use((req, res) => {
  res.status(404).send("404 Error!");
});
