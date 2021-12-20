import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { convert, diffBetweenDates, validateDate } from "../../../utils/date";

interface IUpdateProject {
  project_id: string;
  cost?: number;
  description?: string;
  end_date?: string;
  manager?: string;
  project_name?: string;
}

class UpdateProjectService {
  async execute({
    project_id,
    cost,
    description,
    end_date,
    manager,
    project_name,
  }: IUpdateProject) {
    const project = await cursor.query(
      `SELECT * FROM project WHERE project_id = '${project_id}'`
    );

    if (project.rowCount == 0)
      throw new AppError("No project found with id: " + project_id);

    if (manager) {
      const managerAlreadyExists = await cursor.query(
        `SELECT * FROM employee WHERE id = '${manager}'`
      );

      if (managerAlreadyExists.rowCount == 0)
        throw new AppError("Invalid manager. No employee with id: " + manager);
    }

    if (end_date) {
      if (!validateDate(end_date))
        throw new AppError(
          "End date is invalid. Plese use the format dd-mm-yyyy"
        );

      const end_date_converted = convert(end_date);
      const start_date_converted = project.rows[0].start_date;

      if (diffBetweenDates(start_date_converted, end_date_converted) <= 0)
        throw new AppError("Start date must be before end date");
    }

    if (project_name) {
      const projectAlreadyExists = await cursor.query(
        `SELECT project_name FROM project WHERE project_name = '${project_name} AND project_id != '${project_id}'`
      );

      if (projectAlreadyExists.rowCount > 0)
        throw new AppError(
          `There is already a project with the name ${project_name}`
        );
    }

    if ((cost as number) <= 0)
      throw new AppError("Cost must be greater than 0");

    if (description && description.length > 500)
      throw new AppError("Description must be less than 500 characters");
  }
}

export default UpdateProjectService;
