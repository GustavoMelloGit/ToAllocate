import { Request, Response } from "express";
import AppError from "../../../shared/errors/AppError";
import UpdateEmployeeAsAdminService from "../../services/Employees/UpdateEmployeeAsAdminService";

class UpdateEmployeeAsAdminController {
  async handle(request: Request, response: Response) {
    let employee_id;
    if (request.params.employee_id) employee_id = request.params.employee_id;
    else employee_id = request.employee_id;

    const { isadmin } = request.body;
    const body_parsed = Object.keys(request.body);

    if (body_parsed.length == 0) throw new AppError("No data to update");

    body_parsed.forEach((key) => {
      if (key.toLocaleLowerCase() !== "isadmin") {
        throw new AppError(
          "Only 'isadmin' attribute can be updated by this endpoint"
        );
      }
    });

    const updateEmployeeAsAdminController = new UpdateEmployeeAsAdminService();

    const employee = await updateEmployeeAsAdminController.execute({
      employee_id,
      isadmin,
    });

    return response.status(200).json(employee);
  }
}

export default UpdateEmployeeAsAdminController;
