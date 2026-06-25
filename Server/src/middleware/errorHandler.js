import { sendError } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error";

  return sendError(res, message, statusCode);
};

export default errorHandler;
