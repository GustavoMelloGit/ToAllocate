import { Request, Response } from "express";
import DeleteProjectService from "../../services/Project/DeleteProjectService";

class DeleteProjectController {
  async handle(request: Request, response: Response) {
    const { project_id } = request.params;

    const deleteProjectService = new DeleteProjectService();
    const result = await deleteProjectService.execute(project_id);

    return response.status(200).json({ message: result });
  }
}

export default DeleteProjectController;
