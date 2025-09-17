//import JSON Web Token library for authentication
const jwt = require("jsonwebtoken");

//load JWT secret from environment variables
const secret = process.env.JWT_SECRET;

//set token expiration time to 7 days
const expiration = "7d";

//validate JWT secret presence in environment variables
if (!secret) {
  //throw error if JWT secret is not defined
  throw new Error("JWT_SECRET must be defined in environment variables");
}

//helper function to send authentication errors
const authError = (res, message = "Unauthorized") => {
  return res.status(401).json({ message });
};

module.exports = {
  //authentication middleware to verify JWT tokens

  authMiddleware: (req, res, next) => {
    //extract token from request headers, query, or body
    let token = req.headers.authorization || req.query.token || req.body.token;

    //remove "Bearer " prefix from token if present
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    //check if token is provided
    if (!token) {
      //return error response if token is missing
      return res.status(400).json({ message: "No token provided" });
    }

    try {
      //verify token using JWT secret
      const decoded = jwt.verify(token, secret);
      //attach user info to request object
      req.user = decoded;
      //call next middleware function
      next();
    } catch (err) {
      //log JWT verification error
      console.error("JWT verification failed:", err.message);
      //return error response for invalid or expired token
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  //signs a JWT token with user data
  signToken: function ({ _id, username, email }) {
    //create payload with user data
    const payload = { _id, username, email };
    //sign token with JWT secret and expiration time
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
