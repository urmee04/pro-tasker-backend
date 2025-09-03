//import Express Router
const router = require("express").Router();
//import Task model
const Task = require("../../models/Task");
//import authentication middleware and authorship verification utility
const { authMiddleware } = require("../../utils/auth");
const verifyAuthorship = require("../../utils/authorship");

//protect all task routes with authentication middleware
router.use(authMiddleware);

//---------------------------------------------------------------------------------------------
// Create a new task for a project - POST /projects/:projectId/tasks(project ownership required)
//----------------------------------------------------------------------------------------------
router.post("/projects/:projectId/tasks", async (req, res) => {
  try {
    //verify project ownership
    const project = await verifyAuthorship(req.params.projectId, req.user._id);
    if (!project) {
      return res
        .status(403)
        .json({ message: "Unauthorized or project not found" });
    }

    //create a new task with project reference
    const task = await Task.create({
      ...req.body,
      project: project._id,
    });

    //return the created task with 201 status
    res.status(201).json(task);
  } catch (err) {
    //handle internal server error
    res.status(500).json(err);
  }
});

//------------------------------------------------------------------------------------------
// Get all tasks for a project - GET /projects/:projectId/tasks (project ownership required)
//------------------------------------------------------------------------------------------
router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    //verify project ownership
    const project = await verifyAuthorship(req.params.projectId, req.user._id);
    if (!project) {
      return res
        .status(403)
        .json({ message: "Unauthorized or project not found" });
    }

    //retrieve all tasks for the project
    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (err) {
    //handle internal server error
    res.status(500).json(err);
  }
});

//------------------------------------------------------------------------------------------
// Update a task - PUT /tasks/:taskId (project ownership required via task's parent project)
//------------------------------------------------------------------------------------------
router.put("/tasks/:taskId", async (req, res) => {
  try {
    //find the task by ID
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //verify project ownership via task's parent project
    const project = await verifyAuthorship(task.project, req.user._id);
    if (!project) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //update the task
    Object.assign(task, req.body);
    await task.save();

    //return the updated task
    res.json(task);
  } catch (err) {
    //handle internal server error
    res.status(500).json(err);
  }
});

//---------------------------------------------------------------------------------------------
// Delete a task - DELETE /tasks/:taskId (project ownership required via task's parent project)
//---------------------------------------------------------------------------------------------
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    //find the task by ID
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //verify project ownership via task's parent project
    const project = await verifyAuthorship(task.project, req.user._id);
    if (!project) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //delete the task
    await task.deleteOne();
    res.json({ message: "Task deleted!" });
  } catch (err) {
    //handle internal server error
    res.status(500).json(err);
  }
});

//export the task router
module.exports = router;
