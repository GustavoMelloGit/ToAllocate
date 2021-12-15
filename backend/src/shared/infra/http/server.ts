import dotenv from "dotenv";
import "express-async-errors";
import "reflect-metadata";
import "../database/createDatabase";
import { app } from "./app";

dotenv.config();

// populateDb();

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
