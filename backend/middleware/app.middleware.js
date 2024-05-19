const cors = require('cors');
const passport = require('./passport-setup');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const isProdEnv = process.env.NODE_ENV === 'prod';

module.exports = function(app) {
  app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: isProdEnv, // Secure cookies in production
      sameSite: isProdEnv ? 'none' : 'lax', // 'none' for cross-origin in production, 'lax' for local
      domain: isProdEnv ? process.env.FRONTEND_ENDPOINT : undefined // Set domain for production
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    cors({
      origin: process.env.FRONTEND_ENDPOINT,
      credentials: true
    })
  );

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
