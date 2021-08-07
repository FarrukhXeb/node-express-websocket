import dotenv from "dotenv";
import { join } from "path";
import App from "./App";

dotenv.config({ path: join(__dirname, "../", ".env") });
const { app } = new App();

app.listen();
