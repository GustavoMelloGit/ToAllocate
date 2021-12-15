import { Request, Response } from "express";
import GetAllProjectsService from "../../services/Project/GetAllProjectsService";

class GetAllProjectsController {
  async handle(request: Request, response: Response) {
    const getAllProjectsService = new GetAllProjectsService();

    const projects = await getAllProjectsService.execute();

    return response
      .status(200)
      .json({ projects_count: projects.length, projects });
  }
}

export default GetAllProjectsController;
