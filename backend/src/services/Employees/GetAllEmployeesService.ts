import { cursor } from "../../utils/cursor";

class GetAllEmployeesService {
  async execute() {
    const employees = await cursor.query("SELECT * FROM employee");

    if (employees.rowCount < 1) return [];

    employees.rows.forEach((row) => {
      delete row.password;
    });

    return employees.rows;
  }
}

export default GetAllEmployeesService;
