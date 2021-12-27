import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { cursor } from "../../../../utils/cursor";

interface IPayload {
  sub: string;
}

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken)
    return response
      .status(401)
      .json({ message: "Essa ação requer um token de acesso" });

  const [, token] = authToken.split(" ");

  const {
    rows: [tokenExists],
  } = await cursor.query(`
    SELECT * FROM token WHERE token = '${token}'
  `);

  if (!tokenExists)
    return response.status(403).json({ message: "Token inválido" });

  try {
    const { sub } = verify(token, String(process.env.SECRET)) as IPayload;

    if (!sub) return response.status(403).json({ error: "Token expirado" });

    request.employee_id = sub;

    return next();
  } catch (error) {
    return response.status(403).json({ error: "Token expirado" });
  }
}
