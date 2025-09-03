//import Express Router and User model
const router = require("express").Router();
const User = require("../../models/User");
//import signToken function for authentication
const { signToken } = require("../../utils/auth");

/**
 * POST /api/users/register - Create a new user
 */
router.post("/register", async (req, res) => {
  try {
    //create a new user with the provided data
    const user = await User.create(req.body);
    //generate a token for the new user
    const token = signToken(user);
    //return the token and user data
    res.status(201).json({ token, user });
  } catch (err) {
    console.error("User registration error:", err.message);
    //handle any errors during user creation
    res.status(400).json(err);
  }
});

/**
 * POST /api/users/login - Authenticate a user and return a token
 */
router.post("/login", async (req, res) => {
  try {
    //find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      //return an error if the user is not found
      return res.status(400).json({ message: "Can't find this user" });
    }

    //check if the password is correct
    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      //return an error if the password is incorrect
      return res.status(400).json({ message: "Wrong password" });
    }

    //generate a token for the authenticated user
    const token = signToken(user);
    //return the token and user data
    res.json({ token, user });
  } catch (err) {
    //handle any errors during login
    res.status(400).json(err);
  }
});

//export the router
module.exports = router;
