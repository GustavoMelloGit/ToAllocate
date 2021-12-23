import dotenv from "dotenv";
import "express-async-errors";
import "reflect-metadata";
import "../database/createDatabase";
import { app } from "./app";

dotenv.config();

app.listen(process.env.PORT || 3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
