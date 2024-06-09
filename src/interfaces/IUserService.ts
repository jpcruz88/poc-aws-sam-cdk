export interface IUserService {
  createUser(authToken: any): Promise<any>;
}
