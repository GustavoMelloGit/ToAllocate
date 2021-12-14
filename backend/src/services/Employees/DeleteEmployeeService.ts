import { cursor } from "../../utils/cursor";

class DeleteEmployeeService {
  async execute(id: string) {
    const a = await cursor.query(`DELETE FROM employee WHERE id = '${id}'`);

    console.log(a.rows);
  }
}

export default DeleteEmployeeService;
