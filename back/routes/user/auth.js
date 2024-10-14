import express from "express";
import controllers from "../../controllers/index.js";

const router = express.Router();

router.post("/signup", controllers.auth.createUser);

router.post("/login", controllers.auth.login);

export default router;
