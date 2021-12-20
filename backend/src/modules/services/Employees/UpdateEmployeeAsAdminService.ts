import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

interface IUpdateEmployee {
  employee_id: string;
  isadmin?: boolean;
  role?: string;
}

class UpdateEmployeeAsAdminService {
  async execute({ employee_id, isadmin, role }: IUpdateEmployee) {
    const { rows } = await cursor.query(
      `SELECT * FROM employee WHERE id = '${employee_id}'`
    );

    if (rows.length == 0)
      throw new AppError(`No employee with id ${employee_id}`);

    const keys = Object(arguments[0]);
    let query = `UPDATE employee SET `;

    for (let key in keys) {
      if (key === "isadmin" || key === "role") {
        if (keys[key] !== undefined) {
          query += `${key} = '${keys[key]}', `;
        }
      }
    }

    query += `updated_at = NOW() WHERE id = '${employee_id}' RETURNING *`;

    const { rows: updatedEmployee } = await cursor.query(query);
    delete updatedEmployee[0].password;

    return updatedEmployee[0];
  }
}

export default UpdateEmployeeAsAdminService;
