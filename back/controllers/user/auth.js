import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import logger from "../../logs/config.js";

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const createNewUser = async (req, res) => {
  const { name, lastname, email, password, picture, planId } = req.body;
  try {
    const user = await User.create({
      name,
      lastname,
      email,
      password,
      picture,
      planId,
    });
    if (user) {
      return res.json({ message: "Created", user });
    } else {
      throw new Error("Cannot be created");
    }
  } catch (e) {
    let error = "";
    if (e.message.includes("User validation failed")) {
      Object.values(e.errors).forEach(({ properties }) => {
        error = properties.message;
      });
    }
    logger.error("Auth Controller - " + e);
    return res.status(400).json({ error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.json({ token });
  } catch (error) {
    logger.error("Auth Controller - " + error);
    return res.status(400).json({ message: error.message });
  }
};

export { createNewUser, loginUser };
