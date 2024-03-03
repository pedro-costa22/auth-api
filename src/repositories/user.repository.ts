import { prisma } from "../database/prisma";
import { IUser } from "../core/types/User";

class UserRepository {
  async createUser(data: IUser) {
    const user = await prisma.user.create({
        data: {
          ...data
        },
        select:{
            id: true,
            email: true,
            password: false,
            phone: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return user;
  };

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
    });

    return user;
  };

  async findAll() {
    const users = await prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        birthDate: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return users;
  }

  async findById(id: string){
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select:{
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        birthDate: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  async update(id: string, data) {
    await prisma.user.updateMany({
      where: {
        id
      },
      data: {
        ...data
      }
    });
  }

  async delete(id: string) {
    await prisma.user.deleteMany({
      where: {
        id: id
      }
    });
  }
}

export default new UserRepository();