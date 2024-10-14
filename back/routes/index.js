import AuthRouter from "./user/auth.js";
import ProfileRouter from "./user/profile.js";
import CategoryRouter from "./content/category.js";
import ContentRouter from "./content/content.js";
import PlanRouter from "./content/plan.js";

const routes = {
  AuthRouter,
  ProfileRouter,
  CategoryRouter,
  ContentRouter,
  PlanRouter,
};

export default routes;
