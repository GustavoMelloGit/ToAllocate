import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { convert, diffBetweenDates, validateDate } from "../../../utils/date";
import { deleteObject } from "../../../utils/deleteObject";

export interface IUpdateProject {
  project_id: string;
  project_name?: string;
  end_date?: string;
  cost?: number;
  description?: string;
  manager?: string;
  images?:
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[]
    | undefined;
}

class UpdateProjectService {
  async execute({
    project_id,
    cost,
    description,
    end_date,
    manager,
    project_name,
    images,
  }: IUpdateProject) {
    const project = await cursor.query(
      `SELECT *, cardinality(images) AS image_count FROM project WHERE project_id = '${project_id}'`
    );

    if (project.rowCount == 0) {
      throw new AppError("No project found with id: " + project_id);
    }

    if (manager) {
      const managerAlreadyExists = await cursor.query(
        `SELECT * FROM employee WHERE id = '${manager}'`
      );
      if (managerAlreadyExists.rowCount == 0) {
        throw new AppError("Invalid manager. No employee with id: " + manager);
      }
    }

    if (end_date) {
      if (!validateDate(end_date)) {
        throw new AppError(
          "End date is invalid. Plese use the format dd-mm-yyyy"
        );
      }

      const end_date_converted = convert(end_date);
      const start_date_converted = project.rows[0].start_date;

      if (diffBetweenDates(start_date_converted, end_date_converted) <= 0) {
        throw new AppError("Start date must be before end date");
      }
    }

    if (project_name) {
      if (project_name === project.rows[0].project_name) {
        throw new AppError(
          `There is already a project with the name ${project_name}`
        );
      }
    }

    if ((cost as number) <= 0) {
      throw new AppError("Cost must be greater than 0");
    }

    if (description && description.length > 500) {
      throw new AppError("Description must be less than 500 characters");
    }

    const args = arguments[0];

    let query = `UPDATE project SET `;

    Object.keys(args).forEach((key) => {
      if (key !== "project_id" && args[key] !== undefined && key !== "images") {
        query += `${key} = '${args[key]}', `;
      }
    });

    const { image_count } = project.rows[0];
    const images_in_requets = args.images.file ? args.images.file.length : 0;
    const files = args.images.file;

    if (image_count >= 3 && images_in_requets > 0) {
      for (const image in files) {
        deleteObject(process.env.BUCKET_NAME as string, files[image].key);
      }
      throw new AppError("You can't add more than 3 images");
    }

    if (image_count < 3 && images_in_requets > 3 - image_count) {
      for (const image in files) {
        deleteObject(process.env.BUCKET_NAME as string, files[image].key);
      }
      throw new AppError("You can't add more than 3 images");
    }

    if (image_count < 3 && images_in_requets > 0) {
      let tmp = `ARRAY[`;

      for (let i = 0; i < files.length; i++) {
        tmp += `'${files[i].location}',`;
      }

      tmp = tmp.slice(0, -1) + "]";
      query += `images = array_cat(images, ${tmp})`;
    }

    if (query.includes("images"))
      query += `, updated_at = NOW() WHERE project_id = '${project_id}' RETURNING *`;
    else
      query += `updated_at = NOW() WHERE project_id = '${project_id}' RETURNING *`;

    const { rows } = await cursor.query(query);
    return rows[0];
  }
}

export default UpdateProjectService;
