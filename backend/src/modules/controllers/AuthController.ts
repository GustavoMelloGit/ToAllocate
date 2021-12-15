import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = new AuthService();

    const token = await auth.execute({ email, password });

    return res.status(200).json({ token });
  }
}

export default AuthController;
