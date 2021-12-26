import { Request, Response, Router } from "express";
import multer from "multer";
import AuthController from "../../../../modules/controllers/AuthController";
import { cursor } from "../../../../utils/cursor";
import { deleteObjects } from "../../../../utils/deleteObject";
import multerConfig from "../../../../utils/multerConfig";
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

routes.post(
  "/upload",
  multer(multerConfig).single("file"),
  async (request, response) => {
    if (request.file) {
      return response.json(request.file);
    }
    return response.json({ error: "No file provided" });
  }
);

// test route
routes.post("/populate/:num", populateDb);
export { routes };

routes.get("/drop", async (request: Request, response: Response) => {
  try {
    await cursor.query(`
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
  const a = await deleteObjects();
  return response.json(`deleted ${a} objects`);
});
