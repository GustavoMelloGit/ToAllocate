import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

interface IUpdateEmployee {
  employee_id: string;
  role: string;
}

class UpdateEmployeeAsAdminService {
  async execute({ employee_id, role }: IUpdateEmployee) {
    const { rows } = await cursor.query(
      `SELECT * FROM employee WHERE id = '${employee_id}'`
    );

    if (rows.length == 0)
      throw new AppError(
        `Nenhum funcionário encontrado com o id ${employee_id}`,
        404
      );

    if (
      role.toLocaleLowerCase() !== "admin" &&
      role.toLocaleLowerCase() !== "user"
    )
      throw new AppError(
        `O cargo ${role} não é válido. Os cargos válidos são: admin e user`,
        400
      );

    const { rows: updatedEmployee } = await cursor.query(`
      UPDATE employee SET role = '${role}', updated_at = NOW() WHERE id = '${employee_id}' RETURNING *
    `);
    delete updatedEmployee[0].password;

    return updatedEmployee[0];
  }
}

export default UpdateEmployeeAsAdminService;
