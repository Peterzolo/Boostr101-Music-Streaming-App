const { check, validationResult } = require("express-validator");

exports.validateSong = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please include the song's title"),
  check("artiste")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Artiste field cannot be empty"),
  check("song")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Song field cannot be empty"),
  check("img")
    .trim()
    .not()
    .isEmpty()
    .withMessage("image field cannot be empty"),
  check("duration")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Duration field cannot be empty"),
];

exports.songValidate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(402).json({ success: false, error: error[0].msg });
};
