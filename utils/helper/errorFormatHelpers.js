const catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

function AppError(
  name = "generic",
  httpCode = 500,
  message = "Uknown error has occured",
  content = {},
  isOperational = false,
  innerException = null
) {
  Error.captureStackTrace(this, AppError);
  this.name = name;
  this.date = new Date();
  this.httpCode = httpCode;
  this.content = content;
  this.isOperational = isOperational;
  this.message = message;
  this.innerException = innerException;
}

module.exports = {
  catchErrors,
  AppError,
};
