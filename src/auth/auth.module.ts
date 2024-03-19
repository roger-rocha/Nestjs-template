import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthLoginWithEmailUsecase } from "../@core/application/Auth/AuthLoginWithEmail.usecase";
import { PrismaClient } from "@prisma/client";
import { AuthPrismaRepository } from "../@core/infra/db/prisma/repositories/Auth/AuthPrisma.repository";
import { EncryptService } from "../service/Encrypt/Encrypt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AuthPrismaRepository,
      useFactory: () => {
        return new AuthPrismaRepository(new PrismaClient());
      },
    },
    {
      provide: EncryptService,
      useFactory: () => {
        return new EncryptService();
      },
    },
    {
      provide: AuthLoginWithEmailUsecase,
      useFactory: (
        auth_repository: AuthPrismaRepository,
        encrypt_service: EncryptService
      ) => {
        return new AuthLoginWithEmailUsecase(auth_repository, encrypt_service);
      },
      inject: [AuthPrismaRepository, EncryptService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
