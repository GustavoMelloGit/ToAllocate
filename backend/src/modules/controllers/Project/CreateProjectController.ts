import { Request, Response } from "express";
import CreateProjectService from "../../services/Project/CreateProjectService";

class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { project_name, start_date, end_date, cost, description, manager } =
      request.body;

    const images_url = request.files ? request.files : undefined;

    const createProjectService = new CreateProjectService();

    const project = await createProjectService.execute({
      project_name,
      start_date,
      end_date,
      cost,
      description,
      manager,
      images_url,
    });

    return response.status(201).json(project);
  }
}

export default CreateProjectController;
