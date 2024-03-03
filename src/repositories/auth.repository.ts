import { prisma } from "../database/prisma";

class AuthRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  async findByCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password
      }, 
      select:{
        id: true,
        email: true,
        password: false,
        phone: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }
}

export default new AuthRepository();