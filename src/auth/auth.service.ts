import { Injectable } from "@nestjs/common";
import { UserLoginWithEmailDto } from "./dto/UserLoginWithEmail.dto";
import { AuthLoginWithEmailUsecase } from "../@core/application/Auth/AuthLoginWithEmail.usecase";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private authLoginWithEmailUsecase: AuthLoginWithEmailUsecase,
    private jwtService: JwtService
  ) {}

  async loginWithEmailAndPassword(
    userLoginWithEmailDto: UserLoginWithEmailDto
  ) {
    const user = await this.authLoginWithEmailUsecase.execute({
      email: userLoginWithEmailDto.email,
      password: userLoginWithEmailDto.senha,
    });

    const access_token = await this.jwtService.signAsync({
      uuid: user.uuid,
      email: user.email,
      nome: user.nome,
      crmv: user.crmv,
      usuario_w2o: user.usuario_w2o,
      foto: user.foto
        ? `${process.env.BASE_URL}/${process.env.UPLOAD_FOLDER}/${user.foto}`
        : null,
    });

    return {
      access_token: access_token,
    };
  }
}
