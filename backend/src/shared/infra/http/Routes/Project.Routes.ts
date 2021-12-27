import { Router } from "express";
import multer from "multer";
// controllers
import CreateProjectController from "../../../../modules/controllers/Project/CreateProjectController";
import DeleteProjectController from "../../../../modules/controllers/Project/DeleteProjectController";
import FindOneProjectController from "../../../../modules/controllers/Project/FindOneProjectController";
import GetAllProjectsController from "../../../../modules/controllers/Project/GetAllProjectsController";
import UpdateProjectController from "../../../../modules/controllers/Project/UpdateProjectController";
import multerConfig from "../../../../utils/multerConfig";
import {
  createProjectFields,
  updateProjectFields,
} from "../../../../utils/utils";
// middlewares
import { isAuthenticated } from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const createProjectController = new CreateProjectController();
const deleteProjectController = new DeleteProjectController();
const getAllProjectsController = new GetAllProjectsController();
const updateProjectController = new UpdateProjectController();
const findOneProjectController = new FindOneProjectController();

const routes = Router();

routes.get("/projects", isAuthenticated, getAllProjectsController.handle);

routes.get(
  "/project/:project_id",
  isAuthenticated,
  findOneProjectController.handle
);

routes.post(
  "/create-project",
  isAuthenticated,
  isAdminMiddleware,
  multer(multerConfig).fields(createProjectFields),
  createProjectController.handle
);

routes.put(
  "/update-project/:project_id",
  isAuthenticated,
  isAdminMiddleware,
  multer(multerConfig).fields(updateProjectFields),
  updateProjectController.handle
);

routes.delete(
  "/delete-project/:project_id",
  isAuthenticated,
  isAdminMiddleware,
  deleteProjectController.handle
);

export default routes;
