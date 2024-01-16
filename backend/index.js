import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { PORT } from "./config/config.js";
import IndexRoutes from "./routes/index.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import NotesRoutes from "./routes/notes.routes.js";
import CategoriesRoutes from "./routes/categories.routes.js";
import db from "./db/db.js";
import DatabaseInitializer from "./servicies/db.service.js";
import { dirname, join } from "path";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(express.json());
app.use(IndexRoutes);
app.use(UsersRoutes);
app.use(NotesRoutes);
app.use(CategoriesRoutes);
app.use(express.static(join(__dirname, "../frontend/dist")));

async function main() {
  try {
    await db.authenticate();
    const databaseInitializer = new DatabaseInitializer(db);
    databaseInitializer.syncDb();
    app.listen(PORT, () => {
      console.log("server is listening on 4000 port");
    });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}
main();
