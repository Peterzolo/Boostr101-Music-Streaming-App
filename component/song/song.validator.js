const { check, validationResult } = require("express-validator");

exports.validateSong = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title field cannot be empty"),
  check("artiste").exists().withMessage("Artiste's name is required"),
  check("song").not().isEmpty().withMessage("No song is uploaded yet"),
  check("duration")
    .not()
    .isEmpty()
    .withMessage("Please indicate the song's duration"),
];

exports.validateRes = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(402).json({ success: false, error: error[0].msg });
};
