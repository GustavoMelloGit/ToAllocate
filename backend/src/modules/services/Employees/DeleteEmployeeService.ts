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
        `O funcionário não pode ser deletado pois ele é gerente no(s) projeto(s): ${projectsNames.join(
          ", "
        )}. Para deletar o funcionário, é necessário alterar o gerente dos respectivos projetos.`,
        400
      );
    }

    const { rows } = await cursor.query(
      `DELETE FROM employee WHERE id = '${id}' RETURNING CONCAT(Fname, ' ', Lname) as name;`
    );

    if (rows.length === 0)
      throw new AppError("Funcionário não encontrado", 404);

    return rows[0];
  }
}

export default DeleteEmployeeService;
