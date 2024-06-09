import axios from "axios";
import { IUserService } from "../interfaces/IUserService";
import config from "../config/config";

export class UserService implements IUserService {
  public async createUser(authToken: string): Promise<any> {
    try {
      const response = await axios.post(
        config.endpointUrl,
        {
          name: "morpheus",
          job: "leader",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        "Error al crear el usuario: " +
          (error instanceof Error ? error.message : "Error desconocido")
      );
    }
  }
}
