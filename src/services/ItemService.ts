import { IAuthService } from "../interfaces/IAuthService";
import { IRequestService } from "../interfaces/IRequestService";
import { IUserService } from "../interfaces/IUserService";
import { IItemRepository } from "../interfaces/IItemRepository";
import { ErrorHandler } from "../utils/ErrorHandler";

export class ItemService {
  private repository: IItemRepository;
  private authService: IAuthService;
  private requestService: IRequestService;
  private userService: IUserService;
  private generateUuid: () => string;

  constructor(
    repository: IItemRepository,
    authService: IAuthService,
    requestService: IRequestService,
    userService: IUserService,
    generateUuid: () => string
  ) {
    this.repository = repository;
    this.authService = authService;
    this.requestService = requestService;
    this.userService = userService;
    this.generateUuid = generateUuid;
  }

  public async handleEvent(event: any): Promise<any> {
    try {
      const authToken = this.authService.extractAuthToken(event);
      if (!authToken) {
        throw new Error("Falta el encabezado de autorización");
      }
      const body = this.requestService.extractRequestBody(event);

      const initialItem = this.createInitialItem(body);
      await this.saveItem(initialItem);

      const response = await this.userService.createUser(authToken);
      const responseItem = this.createResponseItem(response.data);
      await this.saveItem(responseItem);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Ítem almacenado en la base de datos y usuario creado",
          response: response.data,
        }),
      };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  private createInitialItem(body: Record<string, any>): Record<string, any> {
    const id = this.generateUuid();

    return {
      id: { S: id },
      phone_id: { N: body.phone_id.toString() },
      whatsapp_id: { N: body.whatsapp_id.toString() },
      messaging_product: { S: body.messaging_product },
      to: { S: body.to },
      type: { S: body.type },
      template_name: { S: body.template.name },
      template_language_code: { S: body.template.language.code },
    };
  }

  private createResponseItem(
    responseData: Record<string, any>
  ): Record<string, any> {
    const { id, name, job, createdAt } = responseData;

    return {
      id: { S: id },
      name: { S: name },
      job: { S: job },
      createdAt: { S: createdAt },
    };
  }

  private async saveItem(item: Record<string, any>): Promise<void> {
    try {
      await this.repository.saveItem(item);
    } catch (error) {
      throw new Error(
        "Error al guardar el ítem: " +
          (error instanceof Error ? error.message : "Error desconocido")
      );
    }
  }
}
