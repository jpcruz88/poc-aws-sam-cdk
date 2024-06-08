import { ItemService } from "./services/ItemService";
import { AuthService } from "./services/AuthService";
import { RequestService } from "./services/RequestService";
import { UserService } from "./services/UserService";
import { DynamoDBItemRepository } from "./repositories/DynamoDBItemRepository";
import { IItemRepository } from "./interfaces/IItemRepository";
import { IAuthService } from "./interfaces/IAuthService";
import { IRequestService } from "./interfaces/IRequestService";
import { IUserService } from "./interfaces/IUserService";
import { v4 as uuidv4 } from "uuid";
import config from "./config/config";

const repository: IItemRepository = new DynamoDBItemRepository(
  config.tableName
);
const authService: IAuthService = new AuthService();
const requestService: IRequestService = new RequestService();
const userService: IUserService = new UserService();
const itemService = new ItemService(
  repository,
  authService,
  requestService,
  userService,
  uuidv4
);

export const handler = async (event: any): Promise<any> => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return await itemService.handleEvent(event);
};
