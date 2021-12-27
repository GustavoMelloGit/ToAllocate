import { Request, Response, Router } from "express";
import AuthController from "../../../../modules/controllers/AuthController";
import { cursor } from "../../../../utils/cursor";
import { deleteAll } from "../../../../utils/deleteFromS3";
import EmployeeRoutes from "./Employee.Routes";
import ProjectRoutes from "./Project.Routes";

const authController = new AuthController();

const routes = Router();
routes.use(EmployeeRoutes);
routes.use(ProjectRoutes);

routes.get("/", (request: Request, response: Response) => {
  return response.json({
    disciplina: "Banco de Dados 1",
    projeto: "ToAllocate",
    alunos: [
      {
        nome: "Caio Felício",
        github: "https://github.com/caiofelicio",
      },
      {
        nome: "Gustavo Marques",
        github: "https://github.com/GustavoMelloGit",
      },
    ],
  });
});

routes.post("/login", authController.handle);

// test route

routes.get("/drop", async (request: Request, response: Response) => {
  try {
    await cursor.query(`
    DROP VIEW IF EXISTS project_view;
    DROP TABLE works_on;
    DROP TABLE token;
    DROP TABLE project;
    DROP TABLE employee;
    `);
    return response.json({ message: "Tables dropped" });
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

routes.get("/delete-objects", async (request: Request, response: Response) => {
  const a = await deleteAll();
  return response.json(`deleted ${a} objects`);
});

export { routes };
