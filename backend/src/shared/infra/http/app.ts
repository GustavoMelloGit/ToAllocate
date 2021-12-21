import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { Client } from "pg";
import { client } from "../../../utils/client";
import { routes } from "./Routes/routes";

dotenv.config();

const cl = new Client(client);
cl.connect();

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export { app };
