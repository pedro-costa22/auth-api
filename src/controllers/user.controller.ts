//Main
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Prisma } from "@prisma/client";

//Repository
import UserRepository from "../repositories/user.repository";

//Utils
import UserValidation from "../core/services/validations/user.validations";
import { IValidate } from "../core/types/Validation";
import { formatError } from "../core/utils/error.util";
import userRepository from "../repositories/user.repository";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      const validate: IValidate = await UserValidation.safeParseAsync(body);
      let hashPassword;

      if(!validate.success) {
        return res.status(400).json({
          error: true,
          statusCode: 400,
          message: "Campos inválidos",
          errorsFields: formatError(validate?.error)
        });
      }

      const userExist = await UserRepository.findByEmail(body.email);
      if(userExist) {
        return res.status(400).json({
          error: true,
          statusCode: 400, 
          message: "Usuario já cadastrado no sistema!"
        });
      }

      const dateString = body.birthDate;
      const [day, month, year] = dateString.split('/');
      const datetime = new Date(year, month - 1, day);
      hashPassword = await bcrypt.hash(body?.password, 10)

      const newUser = await UserRepository.createUser({
        ...body,
        birthDate: datetime,
        password: hashPassword
      });

      if(newUser) {
        return res.status(201).json({
          error: false,
          statusCode: 201, 
          message: "Usuario cadastrado com sucesso!",
          user: newUser
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

  async getUsers(req: Request, res: Response) {
    const users = await userRepository.findAll();

    return res.status(200).json({
      error: false, 
      statusCode: 200,
      users: users
    });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserRepository.findById(id as string);

    if(!user) {
      return res.status(404).json({
        error: true, 
        statusCode: 404,
        mensage: "Usuário não encontrado"
      });
    }

    return res.status(200).json({
      error: false, 
      statusCode: 200,
      user
    });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    let { body } = req;
    const userExist = await UserRepository.findById(id as string);

    if(!userExist) {
      return res.status(404).json({
        error: true, 
        statusCode: 404,
        message: 'Usuário não encontrado, não é possivel realizar a atualização.'
      });
    }

    await UserRepository.update(id, body);

    let hashPassword;
    if(body.password !== undefined) {
      hashPassword = await bcrypt.hash(body?.password, 10);
      body = {
        ...body, 
        password: hashPassword
      }
    }
    
    const userUpdated = await UserRepository.findById(id);
    return res.status(200).json({
      error: false, 
      statusCode: 200,
      message: "Usuário atualizado com sucesso",
      user: userUpdated
    });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params; 
    await UserRepository.delete(id as string);

    return res.status(200).json({
      error: false, 
      statusCode: 200,
      mensage: "Usuário deletado com sucesso!"
    })

  }
}

export default new UserController();