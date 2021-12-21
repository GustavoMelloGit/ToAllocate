import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

class DeleteProjectService {
  async execute(project_id: string) {
    const { rows } = await cursor.query(`
      DELETE FROM
        project
        project_images
      USING
        project_images
      WHERE
        project.project_id = project_images.project_id
      AND
        project.project_id = '${project_id}'
    `);

    if (rows.length == 0) throw new AppError("Cannot find project", 404);

    console.log(rows);

    // const s3 = new aws.S3();

    // await s3
    //   .deleteObject({
    //     Bucket: process.env.BUCKET_NAME as string,
    //     Key: rows[0].image_url,
    //   })
    //   .promise()
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    return rows;
  }
}

export default DeleteProjectService;
