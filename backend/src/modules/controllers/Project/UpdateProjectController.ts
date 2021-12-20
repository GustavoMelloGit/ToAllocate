import { Request, Response } from "express";
import UpdateProjectService from "../../services/Project/UpdateProjectService";

class UpdateProjectController {
  async handle(request: Request, response: Response) {
    const { project_id } = request.params;

    if (!Object.keys(request.body).length)
      return response.status(400).json({ error: "No data provided" });

    const { cost, description, end_date, manager, project_name } = request.body;
    const updateProjectService = new UpdateProjectService();

    const updatedProject = await updateProjectService.execute({
      project_id,
      cost,
      description,
      end_date,
      manager,
      project_name,
    });

    return response.status(200).json(updatedProject);
  }
}

export default UpdateProjectController;
