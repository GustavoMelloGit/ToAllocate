import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { deleteObject } from "../../../utils/deleteObject";

class DeleteProjectService {
  async execute(project_id: string) {
    const { rows } = await cursor.query(`
      DELETE FROM project WHERE project_id = '${project_id}' RETURNING project_name, images
    `);

    if (rows.length == 0) throw new AppError("Cannot find project", 404);

    const images: any[] = [];
    rows[0].images.forEach((image: any) => {
      images.push(image.substring(image.lastIndexOf("/") + 1));
    });

    if (images.length > 0) {
      images.forEach(async (image: string) => {
        if (image !== process.env.DEFAULT_PROJECT_IMAGE)
          await deleteObject(process.env.BUCKET_NAME as string, image);
      });
    }
    return `Project '${rows[0].project_name}' has been deleted`;
  }
}

export default DeleteProjectService;
