import { Router } from "express";
import CreateProjectController from "../../../../modules/controllers/Project/CreateProjectController";
import DeleteProjectController from "../../../../modules/controllers/Project/DeleteProjectController";
import GetAllProjectsController from "../../../../modules/controllers/Project/GetAllProjectsController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const createProjectController = new CreateProjectController();
const deleteProjectController = new DeleteProjectController();
const getAllProjectsController = new GetAllProjectsController();

const routes = Router();

routes.get("/projects", getAllProjectsController.handle);

routes.post(
  "/create-project",
  isAuthenticated,
  isAdminMiddleware,
  createProjectController.handle
);

routes.delete(
  "/delete-project/:project_id",
  isAuthenticated,
  isAdminMiddleware,
  deleteProjectController.handle
);

export default routes;
