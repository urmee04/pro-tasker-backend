//import JSON Web Token library for authentication
const jwt = require("jsonwebtoken");

//load JWT secret from environment variables
const secret = process.env.JWT_SECRET;
//set token expiration time
const expiration = "7d";

//validate JWT secret presence
if (!secret) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

//helper function to send authentication errors
const authError = (res, message = "Unauthorized") => {
  return res.status(401).json({ message });
};

module.exports = {
  /**
   * authentication middleware to verify JWT tokens.
   * req - Request object
   * res - Response object
   * next - Next middleware function
   */
  authMiddleware: (req, res, next) => {
    //allow token from header, query, or body
    let token = req.headers.authorization || req.query.token || req.body.token;

    //extract token from "Bearer <token>" format
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1].trim();
    } else {
      //return error if token is missing or invalid
      return authError(res, "You must be logged in");
    }

    try {
      //verify token and decode payload
      const { data } = jwt.verify(token, secret);
      //attach user data to request object
      req.user = data;
      //proceed to next middleware/route
      next();
    } catch (err) {
      console.error("Invalid token:", err); //log error for debugging

      //handle token expiration error
      if (err.name === "TokenExpiredError") {
        return authError(res, "Session expired, please log in again");
      }
      //return error for invalid token
      return authError(res, "Invalid token");
    }
  },

  /**
   * function to create signed JWT tokens for authentication.
   * user data to include in token
   * signed JWT token
   */
  signToken: ({ username, email, _id }) => {
    //create payload with user data
    const payload = { username, email, _id };
    //sign and return token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
