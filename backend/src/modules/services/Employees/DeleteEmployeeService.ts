import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

class DeleteEmployeeService {
  async execute(id: string) {
    const employeeProjects = await cursor.query(`
        SELECT project_name FROM project WHERE manager = '${id}'
    `);

    if (employeeProjects.rowCount > 0) {
      let projectsNames: any = [];
      employeeProjects.rows.forEach((row) => {
        projectsNames.push(row.project_name);
      });
      throw new AppError(
        `The employee is a manager in the following project(s): ${projectsNames.join(
          ", "
        )}. Please, update the project(s) manager before deleting the employee.`,
        400
      );
    }

    const { rows } = await cursor.query(
      `SELECT FROM employee WHERE id = '${id}' RETURNING *`
    );

    if (rows.length === 0) throw new AppError("Employee not found");

    return rows[0];
  }
}

export default DeleteEmployeeService;
