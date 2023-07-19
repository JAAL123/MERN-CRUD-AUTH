import jswt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequire = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(201).json({ message: "No token, authorization denied" });

  jswt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(201).json({ message: "invalid Token" });
    req.user = user;
    next();
  });
};
