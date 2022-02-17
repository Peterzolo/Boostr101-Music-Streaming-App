const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { userModule, songModule, playListModule } = require("./component");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Boostar101Play");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/users", userModule.route);
app.use("/api/songs", songModule.route);
app.use("/api/playLists", playListModule.route);

module.exports = app;
