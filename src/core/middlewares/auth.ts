import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default function verifyToken(req: Request, res: Response, next: any) {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({
      error: true, 
      statusCode: 401,
      message: "Token Obrigatório"
    });
  }

  try {
    const tokenReplace = token.replace("Bearer ", '');
    jwt.verify(tokenReplace, process.env.TOKEN_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      error: true, 
      statusCode: 401,
      message: "Credenciais inválidas"
    });
  }
}