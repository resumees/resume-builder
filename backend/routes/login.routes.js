const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateJWT = require('../middleware/jwt');
const logger = require("../middleware/logger");

const isProdEnv = process.env.NODE_ENV === 'prod';

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  // need to change failureRedirect to a proper failure frontend page
  passport.authenticate("google", {
    failureRedirect: "https://www.youtube.com",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: isProdEnv,
      sameSite: isProdEnv ? 'none' : 'lax'
    });
    res.redirect(process.env.FRONTEND_ENDPOINT);
  }
);

router.post('/auth/logout', authenticateJWT, (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});

router.get('/auth/check-auth', authenticateJWT, (req, res) => {
  logger.info('PATH: /auth/check-auth - User is authenticated');
  res.json({ isAuthenticated: true });
});

module.exports = router;
