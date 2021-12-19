import { Request, Response, Router } from "express";
import AuthController from "../../../../modules/controllers/AuthController";
import { populateDb } from "../../../../utils/populateDb";
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
    versao: "1.0.0",
    Alunos: ["Caio Felicio", "Gustavo Marques"],
  });
});

routes.post("/login", authController.handle);

// test route
routes.post("/populate/:num", populateDb);
export { routes };
