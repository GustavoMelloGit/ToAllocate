import { cursor } from "../../../utils/cursor";

class GetAllEmployeesService {
  async execute() {
    const employees = await cursor.query(
      "SELECT * FROM employee WHERE Fname != 'Admin' ORDER BY Fname, Lname"
    );

    employees.rows.forEach((row) => {
      delete row.password;
    });

    return employees.rows;
  }
}

export default GetAllEmployeesService;
