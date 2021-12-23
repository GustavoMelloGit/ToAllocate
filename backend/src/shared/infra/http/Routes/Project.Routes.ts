import { Router } from "express";
import multer from "multer";
// controllers
import CreateProjectController from "../../../../modules/controllers/Project/CreateProjectController";
import DeleteProjectController from "../../../../modules/controllers/Project/DeleteProjectController";
import GetAllProjectsController from "../../../../modules/controllers/Project/GetAllProjectsController";
import UpdateProjectController from "../../../../modules/controllers/Project/UpdateProjectController";
import multerConfig from "../../../../utils/multerConfig";
// middlewares
import { isAuthenticated } from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const createProjectController = new CreateProjectController();
const deleteProjectController = new DeleteProjectController();
const getAllProjectsController = new GetAllProjectsController();
const updateProjectController = new UpdateProjectController();

const routes = Router();

routes.get("/projects", getAllProjectsController.handle);

const updateFields = [
  {
    name: "cost",
    maxCount: 1,
  },
  {
    name: "description",
    maxCount: 1,
  },
  {
    name: "file",
    maxCount: 3,
  },
  {
    name: "end_date",
    maxCount: 1,
  },
  {
    name: "manager",
    maxCount: 1,
  },
  {
    name: "project_name",
    maxCount: 1,
  },
];

routes.post(
  "/create-project",
  isAuthenticated,
  isAdminMiddleware,
  multer(multerConfig).array("file", 3),
  createProjectController.handle
);

routes.put(
  "/update-project/:project_id",
  isAuthenticated,
  isAdminMiddleware,
  multer(multerConfig).fields(updateFields),
  // multer(multerConfig).array("file", 3),
  updateProjectController.handle
);

routes.delete(
  "/delete-project/:project_id",
  isAuthenticated,
  isAdminMiddleware,
  deleteProjectController.handle
);

export default routes;
