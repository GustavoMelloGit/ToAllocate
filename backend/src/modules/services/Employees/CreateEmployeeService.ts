import { hash } from "bcryptjs";
import { v4 } from "uuid";
import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";

interface IEmployeeRequest {
  Fname: string;
  Lname: string;
  isadmin?: false;
  role: string;
  email: string;
  password: string;
}

class CreateEmployeeService {
  private validateEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async execute({
    Fname,
    Lname,
    isadmin,
    role,
    email,
    password,
  }: IEmployeeRequest) {
    if (!email) throw new Error("Email is required");

    if (!this.validateEmail(email)) throw new Error("Invalid email");

    const emailAlreadyExists = await cursor.query(
      `SELECT * FROM employee WHERE email = '${email}'`
    );

    if (emailAlreadyExists.rowCount > 0)
      throw new Error("Email already exists");

    const hashPass = await hash(password, 10);
    const id = v4();

    try {
      const { rows } = await cursor.query(`
        INSERT INTO employee (
          id,
          Fname,
          Lname,
          isAdmin,
          role,
          email,
          password
        ) VALUES (
          '${id}',
          '${Fname}',
          '${Lname}',
          '${isadmin}',
          '${role}',
          '${email}',
          '${hashPass}'
        ) RETURNING id, Fname, Lname, isAdmin, role, email
      `);

      return rows[0];
    } catch (error) {
      throw new AppError("Error during creating employee");
    }
  }
}

export default CreateEmployeeService;
