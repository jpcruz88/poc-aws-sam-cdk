import { IRequestService } from "../interfaces/IRequestService";

export class RequestService implements IRequestService {
  public extractRequestBody(event: any): Record<string, any> {
    try {
      if (!event.body) {
        throw new Error("El cuerpo de la solicitud está ausente");
      }
      return JSON.parse(event.body);
    } catch (error) {
      throw new Error(
        "Error al analizar el cuerpo: " +
          (error instanceof Error ? error.message : "Error desconocido")
      );
    }
  }
}
