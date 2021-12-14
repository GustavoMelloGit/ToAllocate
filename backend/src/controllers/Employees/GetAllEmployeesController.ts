import { Request, Response } from "express";
import GetAllEmployeesService from "../../services/Employees/GetAllEmployeesService";

class GetAllEmployeesController {
  async handle(request: Request, response: Response) {
    const getAllEmployeesService = new GetAllEmployeesService();

    const employees = await getAllEmployeesService.execute();

    return response.status(200).json({ employees });
  }
}

export default GetAllEmployeesController;
