import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { validateUuid } from "../../../utils/utils";

class FindOneProjectService {
  async execute(project_id: string) {
    if (!validateUuid(project_id)) {
      throw new AppError("Invalid project id");
    }

    const {
      rows: [project],
    } = await cursor.query(
      `SELECT * FROM project WHERE project_id = '${project_id}'`
    );

    if (!project) {
      throw new AppError("Project not found");
    }

    return project;
  }
}

export default FindOneProjectService;
