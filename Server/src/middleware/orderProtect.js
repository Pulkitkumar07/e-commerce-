import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  

  const token = req.cookies.token;

 

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log("DECODED:", decoded);

  req.user = decoded;

  next();
};
export default protect;