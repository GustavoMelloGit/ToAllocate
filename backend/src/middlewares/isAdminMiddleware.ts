import { NextFunction, Request, Response } from "express";
import { cursor } from "../utils/cursor";

export async function isAdminMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const employee_id = request.employee_id;

  const isAdmin = await cursor.query(
    `SELECT isAdmin FROM employee WHERE id = '${employee_id}'`
  );

  console.log(isAdmin.rows);

  if (!isAdmin) {
    return response
      .status(401)
      .json({ message: "This action require admin privilege" });
  }

  return next();
}
