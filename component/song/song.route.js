const express = require("express");
const songRouter = express.Router();

const { authorize } = require("../utils/middleware/authMiddleware");
const { addSong } = require("./song.controller");
const { validateSong, songValidate } = require("./song.validate");

songRouter.route("/create").post(authorize, validateSong, songValidate, addSong);

module.exports = songRouter;
