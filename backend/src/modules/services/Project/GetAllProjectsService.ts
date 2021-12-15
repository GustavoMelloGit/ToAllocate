import { cursor } from "../../../utils/cursor";

class GetAllProjectsService {
  async execute() {
    const { rows } = await cursor.query(`
        SELECT * FROM project
    `);

    return rows;
  }
}

export default GetAllProjectsService;
