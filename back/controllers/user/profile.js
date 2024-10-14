import User from "../../models/User.js";
import logger from "../../logs/config.js";
import jwt from "jsonwebtoken";
import Plan from "../../models/Plan.js";
import Category from "../../models/Category.js";
import Content from "../../models/Content.js";

const getProfile = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(user.planId);
    const categories = await Category.find({
      _id: { $in: plan.included_categories },
    });
    const contents = await Content.find({
      categoryId: { $in: plan.included_categories },
    });
    return res.json({ user, plan, categories, contents });
  } catch (error) {
    logger.error("Auth Controller - " + error);
    return res.status(400).json({ message: error.message });
  }
};

export { getProfile };
