import { Request, Response } from "express";
import CreateEmployeeService from "../../services/Employees/CreateEmployeeService";

class CreateEmployeeController {
  async handle(request: Request, response: Response) {
    const { Fname, Lname, isadmin, role, email, password } = request.body;

    const createEmployeeService = new CreateEmployeeService();

    const employee = await createEmployeeService.execute({
      Fname,
      Lname,
      isadmin,
      role,
      email,
      password,
    });

    return response.status(201).json(employee);
  }
}

export default CreateEmployeeController;
