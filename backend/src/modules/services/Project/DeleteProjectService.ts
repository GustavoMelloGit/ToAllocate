import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { deleteObjects } from "../../../utils/deleteFromS3";

class DeleteProjectService {
  async execute(project_id: string) {
    const { rows } = await cursor.query(`
      DELETE FROM project WHERE project_id = '${project_id}' RETURNING project_name, images
    `);

    if (rows.length == 0) throw new AppError("Cannot find project", 404);

    if (rows[0].images.length > 0 && process.env.STORAGE_TYPE == "s3") {
      const images = rows[0].images;
      deleteObjects(process.env.BUCKET_NAME as string, images);
    }

    return `O projeto ${rows[0].project_name} foi deletado com sucesso`;
  }
}

export default DeleteProjectService;
