export interface AuthRepository {
  findUserByEmail(data: { email: string }): Promise<any>;
  //change promisse to jwt token
}
