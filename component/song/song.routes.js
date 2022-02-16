const express = require("express");
const songRouter = express.Router();

const { authorize } = require("../../utils/middleware/authMiddleware");

const { postAddSong } = require("./song.controllers");
const { validateSong, validateRes } = require("./song.validator");

songRouter
  .route("/add")
  .post(authorize, validateSong, validateRes, postAddSong);

module.exports = songRouter;
