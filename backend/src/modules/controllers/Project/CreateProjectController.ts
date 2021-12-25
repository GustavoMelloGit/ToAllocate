import { Request, Response } from "express";
import CreateProjectService from "../../services/Project/CreateProjectService";

class CreateProjectController {
  async handle(request: Request, response: Response) {
    const {
      project_name,
      start_date,
      end_date,
      cost,
      description,
      manager,
      employees,
    } = request.body;

    const images = JSON.parse(JSON.stringify(request.files));
    const createProjectService = new CreateProjectService();

    const project = await createProjectService.execute({
      project_name,
      start_date,
      end_date,
      cost,
      description,
      manager: manager ? manager.replace(/[!.-]/g, "") : undefined,
      employees: typeof employees === "string" ? [employees] : employees,
      images: JSON.stringify(images) != "{}" ? images : undefined,
    });

    return response.status(201).json(project);
  }
}

export default CreateProjectController;
