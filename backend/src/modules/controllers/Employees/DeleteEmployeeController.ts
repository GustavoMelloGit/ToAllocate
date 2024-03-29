import { Request, Response } from "express";
import DeleteEmployeeService from "../../services/Employees/DeleteEmployeeService";

class DeleteEmployeeController {
  async handle(request: Request, response: Response) {
    const deleteEmployeeService = new DeleteEmployeeService();
    const { id } = request.params;

    const employee = await deleteEmployeeService.execute(id);

    return response.status(200).json({
      message: `Funcionário ${employee.name} deletado com sucesso`,
    });
  }
}

export default DeleteEmployeeController;
