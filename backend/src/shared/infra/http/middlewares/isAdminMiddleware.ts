import { NextFunction, Request, Response } from "express";
import { cursor } from "../../../../utils/cursor";

export async function isAdminMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const employee_id = request.employee_id;

  const {
    rows: [employee],
  } = await cursor.query(
    `SELECT role FROM employee WHERE id = '${employee_id}'`
  );

  if (employee.role !== "admin") {
    return response.status(401).json({
      message: "Essa ação só pode ser realizado por um usuário admin",
    });
  }

  return next();
}
