const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require("../middleware/logger");
require("dotenv").config();

function authenticateJWT(req, res, next) {
  // Get the JWT from the cookies
  const token = req.cookies.jwt;

  if (token) {
    // Verify the JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.json({ isAuthenticated: false });
      }
      // Find the user in the database using the _id
      const dbUser = await User.findById(user._id);

      if (!dbUser) {
        return res.json({ isAuthenticated: false });
      }

      req.user = dbUser;
      req.username = dbUser.displayName;
      req.email = dbUser.email;
      logger.info('PATH: /authenticateJWT - User is authenticated');

      next();
    });
  } else {
    logger.info('PATH: /authenticateJWT - User is NOT authenticated');
    res.json({ isAuthenticated: false });
  }
}

module.exports = authenticateJWT;