//import Mongoose library for schema and model creation
const { Schema, model } = require("mongoose");

/**
 * define the Project schema with a name, description, and a reference to the user who owns it
 */
const projectSchema = new Schema({
  //project name
  name: {
    type: String,
    required: true,
    trim: true,
  },
  //project description
  description: {
    type: String,
    required: true,
  },
  //reference to the user who owns the project
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//compile schema into a Mongoose model
const Project = model("Project", projectSchema);

//export the Project model
module.exports = Project;
