import { EncryptServiceInterface } from "./EncryptService.interface";
import { InternalServerErrorException } from "@nestjs/common";

const md5 = require("md5");

export class EncryptService implements EncryptServiceInterface {
  constructor() {}

  async encrypt(text): Promise<string> {
    let hash: string;

    try {
      hash = md5(`${process.env.CRYPT_SECRET}${text}`);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException("Erro ao criptografar a senha.");
    }

    return hash;
  }

  async passwordMatch(
    encryptedData: string,
    password: string
  ): Promise<boolean> {
    let match: boolean = false;
    try {
      if (encryptedData == md5(`${process.env.CRYPT_SECRET}${password}`)) {
        match = true;
      }
    } catch (err) {
      throw new InternalServerErrorException("Erro ao comparar a senha.");
    }

    return Promise.resolve(match);
  }
}
