import { Router } from "express";
import AuthController from "./controllers/AuthController";
import CreateEmployeeController from "./controllers/Employees/CreateEmployeeController";
import DeleteEmployeeController from "./controllers/Employees/DeleteEmployeeController";
import GetAllEmployeesController from "./controllers/Employees/GetAllEmployeesController";
import { isAuthenticated } from "./middlewares/authMiddleware";
import { isAdminMiddleware } from "./middlewares/isAdminMiddleware";
import { populateDb } from "./utils/populateDb";

const authController = new AuthController();
const getAllEmployeesController = new GetAllEmployeesController();
const createEmployeeController = new CreateEmployeeController();
const deleteEmployeeController = new DeleteEmployeeController();

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({
    disciplina: "Banco de Dados 1",
    projeto: "ToAllocate",
    versao: "1.0.0",
    devs: ["Caio Felicio", "Gustavo Marques"],
  });
});

routes.post("/login", authController.handle);

routes.post(
  "/create-employee",
  isAuthenticated,
  isAdminMiddleware,
  createEmployeeController.handle
);

routes.post("/populate/:num", populateDb);

routes.get("/employees", isAuthenticated, getAllEmployeesController.handle);

routes.delete(
  "/delete-employee/:id",
  isAuthenticated,
  isAdminMiddleware,
  deleteEmployeeController.handle
);

export { routes };
