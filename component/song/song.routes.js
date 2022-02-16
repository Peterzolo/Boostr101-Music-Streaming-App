const express = require("express");
const songRouter = express.Router();

const { authorize } = require("../../utils/middleware/authMiddleware");

const {
  postAddSong,
  getAllSongs,
  postGetASong,
  postEditSong,
} = require("./song.controllers");
const { fetchASong } = require("./song.services");
const { validateSong, validateRes } = require("./song.validator");

songRouter
  .route("/add")
  .post(authorize, validateSong, validateRes, postAddSong);

songRouter.route("/get-all").get(getAllSongs);
songRouter.route("/get-one/:songId").get(authorize, postGetASong);
songRouter.route("/edit/:songId").put(authorize, postEditSong);

module.exports = songRouter;
