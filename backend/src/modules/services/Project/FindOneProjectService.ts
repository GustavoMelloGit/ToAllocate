import AppError from '../../../shared/errors/AppError';
import { cursor } from '../../../utils/cursor';
import { validateUuid } from '../../../utils/utils';

class FindOneProjectService {
  async execute(project_id: string) {
    if (!validateUuid(project_id)) {
      throw new AppError('Id de projeto inválido', 400);
    }

    const {
      rows: [project],
    } = await cursor.query(`
      SELECT 
        p.project_id,
        p.project_name,
        p.start_date,
        p.end_date,
        p.cost,
        p.description,
        p.images,
        p.created_at,
        p.updated_at
      FROM 
        project p, works_on e 
      WHERE p.project_id = '${project_id}' AND p.project_id = e.project_id 
      GROUP BY p.project_id;
    `);

    if (!project) {
      throw new AppError('Projeto não encontrado', 404);
    }

    const { rows: employees } = await cursor.query(`
        SELECT 
          CONCAT(e.Fname, ' ', e.Lname) as name, w.ocuppation, w.employee_cpf
        FROM
          employee e, works_on w
        WHERE
          e.cpf = w.employee_cpf AND w.project_id = '${project_id}'
      `);

    let tmp = Object.entries(project);
    tmp.splice(6, 0, ['employees', employees]);
    let project_with_employees = Object.fromEntries(tmp);

    return project_with_employees;
  }
}

export default FindOneProjectService;
