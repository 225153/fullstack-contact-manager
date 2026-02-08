const rateLimit = require("express-rate-limit");

// Login rate limiter - strict
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: {
    msg: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  message: { msg: "Too many requests, please try again later" },
});

// Register rate limiter
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registration attempts
  message: { msg: "Too many accounts created, please try again later" },
});

module.exports = { loginLimiter, apiLimiter, registerLimiter };
