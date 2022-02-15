const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Nanme field cannot be empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name should be at least 3 to 20 characters long"),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not valid email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password field cannot be empty")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be bwteen 8 and 15 characters long"),
];
exports.validateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not valid email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password field cannot be empty")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be bwteen 8 and 15 characters long"),
];

exports.validateRes = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(402).json({ success: false, error: error[0].msg });
};
