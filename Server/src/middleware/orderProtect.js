import { sendError } from "../utils/apiResponse.js";
import { verifyAuthToken } from "../utils/auth.js";

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return sendError(res, "No token provided", 401);
  }

  try {
    const user = verifyAuthToken(token);

    if (!user) {
      return sendError(res, "Invalid token", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, "Invalid or expired token", 401);
  }
};
export default protect;
