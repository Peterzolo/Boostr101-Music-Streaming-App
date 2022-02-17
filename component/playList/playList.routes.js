const express = require("express");
const playListRouter = express.Router();

const { authorize } = require("../../utils/middleware/authMiddleware");

const {
  postAddPlayList,
  getAllPlayLists,
  postGetAPlayList,
  postEditPlayList,
  postDeletePlayList,
} = require("./playList.controllers");
const { validatePlayList, validateRes } = require("./playList.validator");

playListRouter
  .route("/add")
  .post(authorize, validatePlayList, validateRes, postAddPlayList);

playListRouter.route("/get-all").get(getAllPlayLists);
playListRouter.route("/get-one/:id").get(postGetAPlayList);
playListRouter.route("/edit/:playListId").put(authorize, postEditPlayList);
playListRouter.route("/remove/:playListId").delete(authorize, postDeletePlayList);

module.exports = playListRouter;
