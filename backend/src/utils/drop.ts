import { Request, Response } from "express";
import { cursor } from "./cursor";

export async function dropTables(request: Request, response: Response) {
  await cursor.query(`
    DROP TABLE IF EXISTS works_on;
    DROP TABLE IF EXISTS token;
    DROP TABLE IF EXISTS project;
    DROP TABLE IF EXISTS employee;
  `);

  return response.status(200).end();
}
