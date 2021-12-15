import { Request, Response } from "express";
import CreateProjectService from "../../services/Project/CreateProjectService";

class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { name, start_date, end_date, cost, description, manager } =
      request.body;

    const createProjectService = new CreateProjectService();

    const project = await createProjectService.execute({
      name,
      start_date,
      end_date,
      cost,
      description,
      manager,
    });

    return response.status(201).json(project);
  }
}

export default CreateProjectController;
