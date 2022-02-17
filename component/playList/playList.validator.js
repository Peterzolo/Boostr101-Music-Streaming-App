const { check, validationResult } = require("express-validator");

exports.validatePlayList = [
  check("name").trim().not().isEmpty().withMessage("Please name your playlist"),
];

exports.validateRes = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(402).json({ success: false, error: error[0].msg });
};
