import dotenv from "dotenv";
import "express-async-errors";
import "reflect-metadata";
import { app } from "./app";
import { createDatabase } from "./createDatabase";

dotenv.config();
createDatabase();

// populateDb();

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
