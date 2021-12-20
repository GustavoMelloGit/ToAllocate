import { Router } from "express";
import CreateEmployeeController from "../../../../modules/controllers/Employees/CreateEmployeeController";
import DeleteEmployeeController from "../../../../modules/controllers/Employees/DeleteEmployeeController";
import GetAllEmployeesController from "../../../../modules/controllers/Employees/GetAllEmployeesController";
import UpdateEmployeeController from "../../../../modules/controllers/Employees/UpdateEmployeeController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const getAllEmployeesController = new GetAllEmployeesController();
const createEmployeeController = new CreateEmployeeController();
const deleteEmployeeController = new DeleteEmployeeController();
const updateEmployeeController = new UpdateEmployeeController();

const routes = Router();

routes.post(
  "/create-employee",
  isAuthenticated,
  isAdminMiddleware,
  createEmployeeController.handle
);

routes.get("/employees", getAllEmployeesController.handle);

routes.put(
  "/employee/update",
  isAuthenticated,
  updateEmployeeController.handle
);

routes.delete(
  "/delete-employee/:id",
  isAuthenticated,
  isAdminMiddleware,
  deleteEmployeeController.handle
);

export default routes;
