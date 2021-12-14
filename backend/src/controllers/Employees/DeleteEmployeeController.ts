import { Request, Response } from "express";
import DeleteEmployeeService from "../../services/Employees/DeleteEmployeeService";

class DeleteEmployeeController {
  async handle(request: Request, response: Response) {
    const deleteEmployeeService = new DeleteEmployeeService();
    const { id } = request.params;

    await deleteEmployeeService.execute(id);

    return response.status(204).json({ message: "User has been deleted" });
  }
}

export default DeleteEmployeeController;
