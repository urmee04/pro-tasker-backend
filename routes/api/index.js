//import Express Router
const router = require("express").Router();

//import route modules
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");

//define API routes
router.use("/api/users", userRoutes); //user management routes
router.use("/api/projects", projectRoutes); //project management routes
router.use("/api", taskRoutes); //task management routes (nested under projects and standalone tasks)

//export the router for use in the main application
module.exports = router;
