const { UNPROCESSABLE_ENTITY, NOT_FOUND } = require("http-status-codes");
const { AppError } = require("../../utils/helper/errorFormatHelpers");

module.exports = {
  InvalidInput: (
    content = {},
    message = "Invalid credential",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  NotAllowed: (
    content = {},
    message = "Not authorized",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  NotFound: (
    content = {},
    message = "Not found",
    name = null,
    innerException = null
  ) => new AppError(name, NOT_FOUND, message, content, innerException),
  ActionFailed: (
    content = {},
    message = "Action failed",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  UserExists: (
    content = {},
    message = "User with this email already exists",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
};
