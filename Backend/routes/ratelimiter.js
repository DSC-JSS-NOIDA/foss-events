const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many request from this IP, please try again after an hour!',
  });