import { Request, Response } from "express";
import AppError from "../../../shared/errors/AppError";
import UpdateEmployeeService from "../../services/Employees/UpdateEmployeeService";

class UpdateEmployeeController {
  async handle(request: Request, response: Response) {
    const body_parser = Object.keys(request.body);

    if (!body_parser.length)
      throw new AppError("Nenhum campo para atualização foi enviado", 400);

    body_parser.forEach((key) => {
      if (key.toLowerCase() !== "password") {
        throw new AppError(
          `Apenas o atributo 'password' pode ser atualizado neste endpoint`
        );
      }
    });

    const updateEmployeeService = new UpdateEmployeeService();
    const { password } = request.body;
    const { employee_id } = request;

    const employee = await updateEmployeeService.execute({
      employee_id,
      password,
    });

    return response.status(200).json(employee);
  }
}

export default UpdateEmployeeController;
