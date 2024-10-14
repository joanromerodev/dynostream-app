import Server from "./models/Server.js";
import dotenv from "dotenv";

dotenv.config();
const app = new Server();

app.middlewares();
app.routes();
app.listen();
