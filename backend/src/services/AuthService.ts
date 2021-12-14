import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { cursor } from "../utils/cursor";

interface IEmployeeRequest {
  email: string;
  password: string;
}

class AuthService {
  async execute({ email, password }: IEmployeeRequest) {
    const employee = await cursor.query(`
      SELECT * FROM employee WHERE email = '${email}'
    `);

    if (employee.rowCount == 0) throw new Error("Email e/ou senha incorretos!");

    const fields = employee.rows[0];
    const matchPassword = await compare(password, fields.password);

    if (!matchPassword) throw new Error("Email e/ou senha incorretos!");

    const token = sign(
      {
        Fname: fields.fname,
        Lname: fields.lname,
        role: fields.role,
      },
      "trabalhobd",
      {
        subject: fields.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export default AuthService;
