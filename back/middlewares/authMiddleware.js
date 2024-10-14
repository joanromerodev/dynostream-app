import jwt from "jsonwebtoken";
import logger from "../logs/config.js";

const requireAuth = (req, res, next) => {
  let token;

  if (req.body && req.body.token) {
    token = req.body.token;
  }
  if (!token && req.query && req.query.token) {
    token = req.query.token;
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        logger.error("Auth Middleware - " + err);
        return res.status(401).json({ message: "Acceso No Autorizado" });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    logger.info("Auth Middleware - Accesso No Autorizado");
    return res.status(401).json({ message: "Acceso No Autorizado" });
  }
};

export default requireAuth;
