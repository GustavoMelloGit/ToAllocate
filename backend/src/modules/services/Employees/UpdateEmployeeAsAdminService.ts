import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

interface IUpdateEmployee {
  employee_id: string;
  isadmin: boolean;
}

class UpdateEmployeeAsAdminService {
  async execute({ employee_id, isadmin }: IUpdateEmployee) {
    const { rows } = await cursor.query(
      `SELECT * FROM employee WHERE id = '${employee_id}'`
    );

    if (rows.length == 0)
      throw new AppError(`No employee with id ${employee_id}`);

    const { rows: updatedEmployee } = await cursor.query(`
      UPDATE employee SET isadmin = ${isadmin} WHERE id = '${employee_id}' RETURNING *
    `);
    delete updatedEmployee[0].password;

    return updatedEmployee[0];
  }
}

export default UpdateEmployeeAsAdminService;
