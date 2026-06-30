import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).json({ message: "permiiton denied" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "permiiton denied" });
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req["userId"] = payload.userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: "permiiton denied" });
  }
};
