import { v4 } from "uuid";
import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { convert, diffBetweenDates, validateDate } from "../../../utils/date";

interface IProjectRequest {
  project_name: string;
  start_date: string;
  end_date: string;
  cost: Number;
  description: string;
  manager: string;
  image_url: string[] | undefined;
}

class CreateProjectService {
  async execute({
    project_name,
    start_date,
    end_date,
    cost,
    description,
    manager,
    image_url,
  }: IProjectRequest) {
    if (!project_name) throw new AppError("Project name is required");

    const projectAlreadyExists = await cursor.query(
      `SELECT * FROM project WHERE project_name = '${project_name}'`
    );

    if (projectAlreadyExists.rowCount > 0)
      throw new AppError(
        `There is already a project with the name ${project_name}`
      );

    const start_date_converted = convert(start_date);
    const end_date_converted = convert(end_date);

    if (!validateDate(start_date))
      throw new AppError(
        "Start date is invalid. Please use the format dd-mm-yyyy"
      );

    if (!validateDate(end_date))
      throw new AppError(
        "End date is invalid. Plese use the format dd-mm-yyyy"
      );

    if (diffBetweenDates(start_date_converted, end_date_converted) <= 0)
      throw new AppError("Start date must be before end date");

    if (!cost) throw new AppError("Cost is required");

    if (cost < 0) throw new AppError("Cost must be greater than 0");

    if (description.length > 500)
      throw new AppError("Description must be less than 500 characters");

    if (!manager) throw new AppError("Manager is required");

    const managerAlreadyExists = await cursor.query(
      `SELECT * FROM employee WHERE id = '${manager}'`
    );

    if (managerAlreadyExists.rowCount == 0)
      throw new AppError("Dont exist any employee with this id: " + manager);

    const project_id = v4();

    try {
      const { rows } = await cursor.query(`
      INSERT INTO project (
        project_id,
        project_name,
        start_date,
        end_date,
        cost,
        description,
        manager,
        images
      ) VALUES (
        '${project_id}',
        '${project_name}',
        '${start_date}',
        '${end_date}',
        '${cost}',
        '${description}',
        '${manager}',
        ARRAY['${image_url ? image_url : process.env.DEFAULT_PROJECT_IMAGE}']
      ) RETURNING *
      `);

      await cursor.query(`
        INSERT INTO works_on (
          employee_id,
          project_id
        ) VALUES (
          '${manager}',
          '${project_id}'
        )
      `);

      return rows[0];
    } catch (error) {
      throw new AppError("Error during project creation");
    }
  }
}

export default CreateProjectService;
