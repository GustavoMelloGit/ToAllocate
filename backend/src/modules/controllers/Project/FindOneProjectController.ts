import { Request, Response } from "express";
import FindOneProjectService from "../../services/Project/FindOneProjectService";

class FindOneProjectController {
  async handle(request: Request, response: Response) {
    const { project_id } = request.params;

    const findOneProjectService = new FindOneProjectService();
    const project = await findOneProjectService.execute(project_id);

    return response.status(200).json(project);
  }
}

export default FindOneProjectController;
