const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require("dotenv").config();

function authenticateJWT(req, res, next) {
  // Get the JWT from the cookies
  const token = req.cookies.jwt;

  if (token) {
    // Verify the JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // Find the user in the database using the _id
      const dbUser = await User.findById(user._id);

      if (!dbUser) {
        return res.sendStatus(401);
      }

      req.user = dbUser;
      
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

module.exports = authenticateJWT;