import { Request, Response } from "express";
import UpdateProjectService from "../../services/Project/UpdateProjectService";

class UpdateProjectController {
  async handle(request: Request, response: Response) {
    const { project_id } = request.params;
    const images = JSON.parse(JSON.stringify(request.files));

    if (
      Object.keys(request.body).length == 0 &&
      Object.keys(images).length == 0
    ) {
      return response.status(400).json({ error: "No data provided" });
    }

    const { project_name, end_date, cost, description, manager, employees } =
      request.body;

    const updateProjectService = new UpdateProjectService();

    const updatedProject = await updateProjectService.execute({
      project_id,
      project_name,
      end_date,
      cost,
      description,
      manager: manager ? manager.replace(/[!.-]/g, "") : undefined,
      employees: typeof employees === "string" ? [employees] : employees,
      images: JSON.stringify(images) != "{}" ? images : undefined,
    });

    return response.status(200).json(updatedProject);
  }
}

export default UpdateProjectController;
