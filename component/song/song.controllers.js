const { validationResult } = require("express-validator");
const songService = require("./song.services");
const songError = require("./song.error");

const { sendResponse } = require("../../utils/helper/responseHelpers");
const { isEmpty } = require("../../utils/helper/validationHelpers");

exports.postAddSong = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw songError.InvalidInput(errors.mapped());
  }

  const songData = req.body;
  const savedSong = await songService.createSong(songData);

  return res.status(200).send(
    sendResponse({
      message: "song added successfully",
      content: savedSong,
      success: true,
    })
  );
};

exports.getAllSongs = async (req, res) => {
  try {
    const properties = await songService.fetchAllSongs();

    if (!properties.length) {
      throw songError.NotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "songs successfully loaded",
        content: properties,
        success: true,
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postEditSong = async (req, res) => {
  try {
    let updateData = req.body;
    const { songId } = req.params;
    const userId = req.user.id;

    const editSong = await songService.editSong(
      songId,
      userId,
      updateData
    );
    if (!editSong) {
      res.status(402).send({ Not_found: "Could not find song" });
    } else {
      res.status(201).send({ Success: `Successfully deleted ${editSong}` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

exports.postDeleteSong = async (req, res) => {
  try {
    let deleteData = req.body.status;
    const { songId } = req.params;
    const userId = req.user.id;
    const songDelete = await songService.deleteOneSong(
      songId,
      userId,
      deleteData
    );
    if (!songDelete) {
      res.status(402).send({ Not_found: "Could not find song" });
    } else {
      res.status(201).send({ Success: `Successfully deleted ${songDelete}` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postGetASong = async (req, res) => {
  try {
    let id = req.params.id;

    if (isEmpty(id)) {
      throw songError.NotFound("Please specify a song to delete");
    }
    const song = await songService.fetchASong(id);
    if (!song) {
      throw new Error("song not found");
    } else {
      res.status(201).send({ Success: song });
    }
  } catch (error) {
    res.status(500).send({ error, message: "Error finding song" });
  }
};
