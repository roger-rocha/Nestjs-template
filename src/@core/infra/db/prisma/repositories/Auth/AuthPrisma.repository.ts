import { PrismaClient } from "@prisma/client";
import { InternalServerErrorException } from "@nestjs/common";
import { AuthRepository } from "../../../../../domain/auth/auth.repository";
export class AuthPrismaRepository implements AuthRepository {
  constructor(private Prisma: PrismaClient) {}

  async findUserByEmail(data: { email: string }): Promise<any> {
    let user;
    try {
      user = await this.Prisma.usuario.findFirst({
        where: {
          email: data.email,
        },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        "Ocorreu um erro ao buscar o usuário!"
      );
    }
    return user;
  }
}
