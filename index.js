const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

const app = express();

//Middleware for body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// bring all routes
const auth = require("./routes/api/auth");
const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");

// mongoDB configurations

const db = require("./setup/myurl").mongoURL;

// Attempt to connect to database

mongoose
  .connect(db)
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

//Passport Middleware
app.use(passport.initialize());

//config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//testing routes
app.get("/", (req, res) => {
  res.send("hello big stack");
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/questions", questions);
app.use("/api/profile", profile);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
