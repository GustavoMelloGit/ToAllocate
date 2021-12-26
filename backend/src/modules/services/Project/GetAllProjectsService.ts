import { cursor } from "../../../utils/cursor";

class GetAllProjectsService {
  async execute() {
    const { rows } = await cursor.query(`
      SELECT 
        p.project_id,
        p.project_name,
        p.start_date,
        p.end_date,
        cast(COUNT(*) as integer) as total_employees,
        p.manager,
        p.cost,
        p.description,
        p.created_at,
        p.updated_at
      FROM 
        project p, works_on w 
      WHERE p.project_id = w.project_id 
      GROUP BY p.project_id 
      ORDER BY p.cost`);

    return rows;
  }
}

export default GetAllProjectsService;
