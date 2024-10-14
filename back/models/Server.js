import dbConnection from "../database/config.js";
import routes from "../routes/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import requireAuth from "../middlewares/authMiddleware.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectDB();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
  }
  routes() {
    this.app.use("/auth", routes.AuthRouter);
    this.app.use("/profile", requireAuth, routes.ProfileRouter);
    this.app.use("/categories", requireAuth, routes.CategoryRouter);
    this.app.use("/plans", requireAuth, routes.PlanRouter);
    this.app.use("/contents", requireAuth, routes.ContentRouter);
    this.app.use("*", (req, res) => {
      return res.status(404).json({ message: "Pagina no encontrada" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App listening in port ", this.port);
    });
  }
}

export default Server;
