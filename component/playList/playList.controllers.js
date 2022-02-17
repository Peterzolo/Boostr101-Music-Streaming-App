const { validationResult } = require("express-validator");
const playListService = require("./playList.services");
const playListError = require("./playList.error");

const { sendResponse } = require("../../utils/helper/responseHelpers");
const { isEmpty } = require("../../utils/helper/validationHelpers");
const PlayList = require("./playList.model");

exports.postAddPlayList = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw playListError.InvalidInput(errors.mapped());
  }

  try {
    const nameExists = await PlayList.findOne({ name: req.body.name });
    if (nameExists) {
      throw playListError.NotFound("Playlist with this name already exists");
    }

    const playListData = req.body;
    const savedPlayList = await playListService.createPlayList(playListData);

    return res.status(200).send(
      sendResponse({
        message: "condition created successfully",
        content: savedPlayList,
        success: true,
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPlayLists = async (req, res) => {
  let landlordId = req.userId;
  const properties = await playListService.fetchAllPlayLists(landlordId);

  if (!properties.length) {
    throw playListError.NotFound();
  }
  return res.status(200).send(
    sendResponse({
      message: "playLists successfully loaded",
      content: properties,
      success: true,
    })
  );
};

exports.postEditPlayList = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw playListError.InvalidInput(errors.mapped());
  }
  try {
    const { playListId } = req.params;
    let userId = req.user.id;
    let updateData = req.body;

    if (isEmpty(playListId)) {
      throw playListError.NotFound("Please specify a playList to edit");
    }

    const query = playListId;
    const user = userId;
    const update = updateData;

    let editedPlayList = await playListService.editPlayList(
      query,
      user,
      update
    );

    console.log("Edited", editedPlayList);
    if (!editedPlayList) {
      throw playListError.NotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "playList updated",
        content: editedPlayList,
        success: true,
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postDeletePlayList = async (req, res) => {
  try {
    let deleteData = req.body.status;
    const { playListId } = req.params;
    const userId = req.user.id;
    const playListDelete = await playListService.deleteOnePlayList(
      playListId,
      userId,
      deleteData
    );
    if (!playListDelete) {
      res.status(402).send({ Not_found: "Could not find playList" });
    } else {
      res
        .status(201)
        .send({ Success: `Successfully deleted ${playListDelete}` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postGetAPlayList = async (req, res) => {
  try {
    let id = req.params.id;

    if (isEmpty(id)) {
      throw playListError.NotFound("Please specify a playList to delete");
    }
    const playList = await playListService.fetchAPlayList(id);
    if (!playList) {
      throw new Error("playList not found");
    } else {
      res.status(201).send({ Success: playList });
    }
  } catch (error) {
    res.status(500).send({ error, message: "Error finding playList" });
  }
};
