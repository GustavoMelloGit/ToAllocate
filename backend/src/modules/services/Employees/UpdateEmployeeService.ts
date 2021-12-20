import { cursor } from "../../../utils/cursor";

interface IUpdateEmployeeRequest {
  employee_id: string;
  password?: string;
}

class UpdateEmployeeService {
  async execute({ employee_id, password }: IUpdateEmployeeRequest) {
    const { rows: employee } = await cursor.query(
      `UPDATE employee SET password = '${password}', updated_at = NOW() WHERE id = '${employee_id}' RETURNING *`
    );

    return employee[0];
  }
}

export default UpdateEmployeeService;
