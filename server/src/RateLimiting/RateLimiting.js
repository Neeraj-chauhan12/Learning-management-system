const limiter = require("express-rate-limit");

const responseMessage = {
  message: "Too many requests from this IP, please try again after a minute",
};

const rateLimiter = limiter({
  windowMs: 1 * 60 * 1000, //1 minute
  max: 100, //limit each IP to 100 concurrent requests per windowMs

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes.",
    });
  },
});

module.exports = rateLimiter;
