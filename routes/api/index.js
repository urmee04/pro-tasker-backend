const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");

//mount user routes at /api/users endpoint
router.use("/users", userRoutes);
//mount project routes at /api/projects endpoint
router.use("/projects", projectRoutes);
//mount task routes at /api/tasks endpoint
router.use("/tasks", taskRoutes);

//export router
module.exports = router;
