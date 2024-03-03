import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import AuthValidation from '../core/services/validations/auth.validation';
import { formatError } from '../core/utils/error.util';
import { IValidate } from '../core/types/Validation';
import AuthRepository from '../repositories/auth.repository';
import { Prisma } from '@prisma/client';

class AuthController {
  async authenticate (req: Request, res: Response) {
    try {
      const validate: IValidate = await AuthValidation.safeParseAsync(req.body);
      if(!validate.success) {
        return res.status(404).json({
          error: true,
          statusCode: 404,
          message: "Campos inválidos",
          errorsFields: formatError(validate?.error)
        });
      }

      const user = await AuthRepository.findByEmail(req.body.email);
      if(!user) {
        return res.status(404).json({
          error: true,
          statusCode: 404,
          message: "Email e/ou senha inválido(s), não foi possível encontrar o usuário informado.",
        });
      }

      if(user && bcrypt.compareSync(req.body.password, user?.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "24h"
          }
        );

        return res.status(200).json({
          error: false,
          statusCode: 200,
          message: "Usuário autenticado com sucesso!",
          user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            birthDate: user.birthDate
          },
          token
        });
      } else {
        return res.status(404).json({
          error: true,
          statusCode: 404,
          message: "Email e/ou senha inválido(s), não foi possível encontrar o usuário informado.",
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.error("Erro de validação do Prisma:", error);
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  }
}

export default new AuthController();