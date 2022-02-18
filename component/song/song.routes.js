const express = require("express");
const songRouter = express.Router();

const { authorize } = require("../../utils/middleware/authMiddleware");

const {
  postAddSong,
  getAllSongs,
  postGetASong,
  postEditSong,
  postDeleteSong,
} = require("./song.controllers");
const { validateSong, validateRes } = require("./song.validator");

songRouter
  .route("/add")
  .post(authorize, validateSong, validateRes, postAddSong);

songRouter.route("/get-all").get(getAllSongs);
songRouter.route("/get-one/:id").get(authorize, postGetASong);
songRouter.route("/edit/:songId").put(authorize, postEditSong);
songRouter.route("/remove/:songId").delete(authorize, postDeleteSong);

module.exports = songRouter;
