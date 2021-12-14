import { Router } from "express";
import AuthController from "./controllers/AuthController";
import GetAllEmployeesController from "./controllers/GetAllEmployeesController";
import { isAuthenticated } from "./middlewares/authMiddleware";

const authController = new AuthController();
const getAllEmployeesController = new GetAllEmployeesController();

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({
    disciplina: "Banco de Dados 1",
    projeto: "ToAllocate",
    versao: "1.0.0",
    devs: ["Caio Felicio", "Gustavo Marques"],
  });
});

routes.post("/create-employee");
routes.post("/login", authController.handle);
routes.get("/employees", isAuthenticated, getAllEmployeesController.handle);

export { routes };
