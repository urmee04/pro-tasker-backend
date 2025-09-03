//import Mongoose library for schema and model creation
const { Schema, model } = require("mongoose");
//import Bcrypt library for password hashing and comparison
const bcrypt = require("bcrypt");

//define the User schema
const userSchema = new Schema({
  //unique username
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  //valid email address
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  //password with minimum length
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

//hash user password before saving to database
userSchema.pre("save", async function (next) {
  //only hash password if it's new or modified
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  //proceed to next middleware
  next();
});

//custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  //compare provided password with hashed password
  return bcrypt.compare(password, this.password);
};

//compile schema into a Mongoose model
const User = model("User", userSchema);

//export the User model
module.exports = User;
