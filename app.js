const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./user/user.route");
const SongRoute = require("./song/song.route");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Boostar101Play");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/users", userRoute);
app.use("/api/songs", SongRoute);

module.exports = app;
