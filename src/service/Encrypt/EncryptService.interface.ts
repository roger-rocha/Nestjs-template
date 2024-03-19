export interface EncryptServiceInterface {
  encrypt(text: string): Promise<string>;
  passwordMatch(encryptedData: string, password: string): Promise<boolean>;
}
