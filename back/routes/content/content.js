import express from "express";
import controllers from "../../controllers/index.js";

const router = express.Router();

router.post("/", controllers.content.getByCategoriesId);

router.get("/id", controllers.content.getById);

export default router;
