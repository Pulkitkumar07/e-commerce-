import jwt from "jsonwebtoken";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export const getAuthCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: COOKIE_MAX_AGE,
  };
};

export const createAuthToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyAuthToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id || decoded.userId;

  if (!userId) {
    return null;
  }

  return {
    id: userId,
    role: decoded.role || "user",
  };
};

export const formatUser = (user) => {
  return {
    _id: user._id,
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
