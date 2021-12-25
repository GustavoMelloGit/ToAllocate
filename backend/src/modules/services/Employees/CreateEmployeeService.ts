import { hash } from "bcryptjs";
import { v4 } from "uuid";
import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { validateCpf, validateEmail } from "../../../utils/utils";

interface IEmployeeRequest {
  Fname: string;
  Lname: string;
  cpf: string;
  role?: string;
  email: string;
  password: string;
}

class CreateEmployeeService {
  async execute({
    Fname,
    Lname,
    cpf,
    role,
    email,
    password,
  }: IEmployeeRequest) {
    if (!email) throw new AppError("Email is required");

    if (!cpf) throw new AppError("CPF is required");

    if (!validateEmail(email)) throw new AppError("Invalid email");

    const employeeAlreadyExists = await cursor.query(
      `SELECT email, cpf FROM employee WHERE email = '${email}' OR cpf = '${cpf}'`
    );

    if (employeeAlreadyExists.rowCount > 0) {
      if (email == employeeAlreadyExists.rows[0].email)
        throw new AppError(
          `There is already an employee with the email: ${email}`
        );
      else
        throw new AppError(`There is already an employee with the cpf: ${cpf}`);
    }

    if (!validateCpf(cpf)) throw new AppError("Invalid cpf");

    const hashPass = await hash(password, 10);
    const id = v4();
    const query = `INSERT INTO employee (id, Fname, Lname, cpf, role, email, password) VALUES ('${id}', '${Fname}', '${Lname}', '${cpf}', '${
      role ? role : "user"
    }', '${email}', '${hashPass}' ) RETURNING *`;

    try {
      const {
        rows: [employee],
      } = await cursor.query(query);

      delete employee.password;
      return employee;
    } catch (error) {
      throw new AppError("Error during creating employee");
    }
  }
}

export default CreateEmployeeService;
