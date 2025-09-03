// Import Mongoose library for schema and model creation
const { Schema, model } = require("mongoose");

//define the Task schema  with a title, description, status, and a reference to the project it belongs to

const taskSchema = new Schema({
  //task title
  title: {
    type: String,
    required: true,
    trim: true,
  },
  //task description
  description: {
    type: String,
    required: true,
  },
  //task status (To Do, In Progress, Done)
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  //reference to the project the task belongs to
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

//compile schema into a Mongoose model
const Task = model("Task", taskSchema);

//export the Task model
module.exports = Task;
