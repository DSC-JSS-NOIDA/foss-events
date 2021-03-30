const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
dotenv.config({ path: ".env" });

const app = new express();

// connecting mongodb
require("./db/db")();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

// set HTTP security headers
app.use(helmet());

//data sanitization against noSQL query injection
app.use(mongoSanitize());

//data sanitization against xss
app.use(xss());

//routes
app.use("/event", require("./routes/EventRoutes"));
app.use("/users/logout", require("./routes/users/logout"));
app.use("/users/login", require("./routes/users/login"));
app.use("/users/signup", require("./routes/users/signup"));

app.listen(PORT, console.log(`listening on port ${PORT}`));
