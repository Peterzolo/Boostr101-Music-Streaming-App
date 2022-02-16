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
      message: "condition created successfully",
      content: savedSong,
      success: true,
    })
  );
};

exports.getAllSongs = async (req, res) => {
  let landlordId = req.userId;
  const properties = await songService.fetchAllSongs(landlordId);

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
};

exports.postEditSong = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw songError.InvalidInput(errors.mapped());
  }
  try {
    const { songId } = req.params;
    let userId = req.user.id;
    let updateData = req.body;

 

    if (isEmpty(songId)) {
      throw songError.NotFound("Please specify a song to edit");
    }

    const query = songId;
    const user = userId;
    const update = updateData;

  
  
    let editedSong = await songService.editSong(query, user, update);

    console.log("Edited", editedSong);
    if (!editedSong) {
      throw songError.NotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "song updated",
        content: editedSong,
        success: true,
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

exports.postDeleteSong = async (req, res) => {
  try {
    let deleteData = req.body.status;
    const { id } = req.params;
    const landlord = req.userId;
    const songDelete = await songService.deleteOneSong(
      id,
      landlord,
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
    let songId = req.params.id;
    if (isEmpty(songId)) {
      throw songError.NotFound("Please specify a song to delete");
    }
    const song = await songService.fetchASong(songId);
    if (!song) {
      throw new Error("song not found");
    } else {
      res.status(201).send({ Success: song });
    }
  } catch (error) {
    res.status(500).send({ error, message: "Error finding song" });
  }
};
