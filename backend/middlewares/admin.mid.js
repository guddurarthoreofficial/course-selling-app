import jwt from "jsonwebtoken";
import "dotenv/config";

function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // console.log("middleware is cslled")

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.log("Invalid token", error);
    return res.status(401).json({ error: "Invalid token or expired token" });
  }
}

export default adminMiddleware;
