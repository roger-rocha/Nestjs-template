import { AuthRepository } from "../../domain/auth/auth.repository";
import { EncryptService } from "../../../service/Encrypt/Encrypt.service";
import { BadRequestException } from "@nestjs/common";

export class AuthLoginWithEmailUsecase {
  constructor(
    private auth_repository: AuthRepository,
    private encrypt_service: EncryptService
  ) {}

  async execute(data: { email: string; password: string }): Promise<any> {
    if (!data.email || !data.password) {
      throw new Error("Dados inválidos");
    }
    let user = await this.auth_repository.findUserByEmail({
      email: data.email,
    });

    if (!user) {
      throw new BadRequestException(
        "Não foi possível encontrar o usuário com o email e senha informados!"
      );
    }

    if (
      !(await this.encrypt_service.passwordMatch(user.senha, data.password))
    ) {
      throw new BadRequestException(
        "Não foi possível encontrar o usuário com o email e senha informados!"
      );
    }

    return user;
  }
}
