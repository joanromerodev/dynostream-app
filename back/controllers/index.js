import { createNewUser, loginUser } from "./user/auth.js";
import { getProfile } from "./user/profile.js";
import { getPlanById } from "./content/plan.js";
import { getContentsByCategoryId, getContentById } from "./content/content.js";
import { getCategoriesById } from "./content/category.js";

const controllers = {
  profile: getProfile,
  auth: {
    createUser: createNewUser,
    login: loginUser,
  },
  plans: getPlanById,
  content: {
    getByCategoriesId: getContentsByCategoryId,
    getById: getContentById,
  },
  category: getCategoriesById,
};

export default controllers;
