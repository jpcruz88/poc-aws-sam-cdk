export interface IUserService {
  createUser(authToken: string): Promise<any>;
}
