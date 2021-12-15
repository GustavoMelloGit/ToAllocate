import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

class DeleteEmployeeService {
  async execute(id: string) {
    const { rows } = await cursor.query(
      `DELETE FROM employee WHERE id = '${id}' RETURNING Fname, Lname`
    );

    if (rows.length === 0) throw new AppError("Employee not found", 404);

    return rows[0];
  }
}

export default DeleteEmployeeService;
