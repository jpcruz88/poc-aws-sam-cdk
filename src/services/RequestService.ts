import { IRequestService } from "../interfaces/IRequestService";

export class RequestService implements IRequestService {
  public extractRequestBody(event: any): Record<string, any> {
    try {
      if (!event.body) {
        throw new Error("Request body is missing");
      }
      return JSON.parse(event.body);
    } catch (error) {
      throw new Error(
        "Error parsing body: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  }
}
