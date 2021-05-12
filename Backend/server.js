const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const request = require('request');
const PORT = process.env.PORT || 3000;

dotenv.config({ path: ".env" });

const app = new express();

// connecting mongodb
require("./db/db")();

//middlewares
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


app.use(morgan("dev"));
app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.render('index');
});
app.use("/event", require("./routes/EventRoutes"));
app.use("/users/logout", require("./routes/users/logout"));
app.use("/users/login", require("./routes/users/login"));
app.use("/users/signup", require("./routes/users/signup"));

app.listen(PORT, console.log(`listening on port ${PORT}`));
