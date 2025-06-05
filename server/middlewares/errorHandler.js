const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  let message = err.message;

  switch (status) {
    case 400:
      message = message || "Bad Request";
      break;
    case 401:
      message = message || "Unauthorized";
      break;
    case 403:
      message = message || "Forbidden";
      break;
    case 404:
      message = message || "Not Found";
      break;
    case 409:
      message = message || "Conflict";
      break;
    case 429:
      message = message || "Too Many Requests";
      break;
    case 500:
      message = message || "Internal Server Error";
      break;
    default:
      message = message || "Something went wrong";
      break;
  }

  res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
