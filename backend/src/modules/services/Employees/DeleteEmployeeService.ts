import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

class DeleteEmployeeService {
  async execute(id: string) {
    const { rows: employeeProjects } = await cursor.query(` 
        SELECT p.project_name FROM employee e, project p WHERE id = '${id}' AND e.cpf = p.manager;
    `);

    if (employeeProjects.length > 0) {
      let projectsNames: any = [];
      employeeProjects.forEach((row) => {
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
      `DELETE FROM employee WHERE id = '${id}' RETURNING CONCAT(Fname, ' ', Lname) as name;`
    );

    if (rows.length === 0) throw new AppError("Employee not found");

    return rows[0];
  }
}

export default DeleteEmployeeService;
