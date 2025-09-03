const router = require("express").Router();
const { Project } = require("../../models/Project");
const { authMiddleware } = require("../../utils/auth");

//apply authMiddleware to all project routes
//this ensures only logged-in users can access these routes
router.use(authMiddleware);

// -----------------------------------------------------------
// GET /api/projects - Get all projects for the logged-in user
// -----------------------------------------------------------
router.get("/", async (req, res) => {
  //find projects associated with the current user's ID
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ----------------------------------------------------------------
// POST /api/projects - Create a new project for the logged-in user
// ----------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      //spread request body and attach the logged-in user's ID
      ...req.body,
      user: req.user._id, //associate project with logged-in user
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json(err);
  }
});

// -------------------------------------------------------------------
// PUT /api/projects/:id - Update a project if owned by logged-in user
// -------------------------------------------------------------------
router.put("/:id", async (req, res) => {
  try {
    //find project by its ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ message: "No project found with this id!" });
    }
    //ensure the logged-in user owns the project
    if (project.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to update this project" });
    }

    //update project with new values and save
    Object.assign(project, req.body);
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------------
// DELETE /api/projects/:id - Delete project if owned by logged-in user
// --------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    //find project by its ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ message: "No project found with this id!" });
    }
    //ensure the logged-in user owns the project
    if (project.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this project" });
    }
    //delete the project
    await project.deleteOne();
    res.json({ message: "Project deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//export router
module.exports = router;
