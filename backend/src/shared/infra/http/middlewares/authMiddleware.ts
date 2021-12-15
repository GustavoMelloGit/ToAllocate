import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken)
    return response
      .status(401)
      .json({ message: "This action require access token" });

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, String(process.env.SECRET)) as IPayload;

    if (!sub) return response.status(403).json({ error: "Token expired" });

    request.employee_id = sub;

    return next();
  } catch (error) {
    return response.status(403).json({ error: "Token expired" });
  }
}
