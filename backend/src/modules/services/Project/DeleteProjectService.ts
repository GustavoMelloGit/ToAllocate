import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

class DeleteProjectService {
  async execute(project_id: string) {
    const { rows } = await cursor.query(`
        DELETE FROM project WHERE project_id = '${project_id}' RETURNING *
    `);

    if (rows.length == 0) throw new AppError("Cannot find project", 404);

    return `Project ${rows[0].name} deleted`;
  }
}

export default DeleteProjectService;
