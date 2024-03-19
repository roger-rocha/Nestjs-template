import { v4 as uuid } from "uuid";
import md5 from "md5";

export class StringHelper {
  /**
   * Creates a hash based on number of caracters specified
   * @param max
   */
  static create_hash(max = 64): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < max; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  /**
   * Creates a UUID
   */
  static create_uuid(): string {
    return uuid();
  }

  static base_64_decode(data: string): string {
    let buff = Buffer.from(data, "base64");

    return buff.toString("ascii");
  }

  /**
   * Encode to base64 a string
   * @param data
   */
  static base_64_encode(data: string): string {
    let buff = Buffer.from(data);

    return buff.toString("base64");
  }

  /**
   * Encodes to md5 a string
   * @param string
   */
  static md5(string: string): string {
    return md5(string);
  }

  /**
   * Gets the hash from .env and concat with the string and encodes to md5
   * @param string
   */
  static password(string: string): string {
    return md5(`${process.env.HASH_SENHA}${string}`);
  }

  /**
   * Remove the special chars from the string
   * @param string
   */
  static remove_special_chars(string: string): string {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
