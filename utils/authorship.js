//import the Project model
const Project = require("../models/Project");

//verify project ownership by a given user
async function verifyAuthorship(projectId, userId) {
  //retrieve the project by ID
  const project = await Project.findById(projectId);

  //if project not found, return null
  if (!project) return null;

  //compare the project owner's ID with the logged-in user's ID
  if (project.user.toString() !== userId.toString()) return null;

  //if ownership is valid, return the project object
  return project;
}

//export the verifyAuthorship function
module.exports = verifyAuthorship;
