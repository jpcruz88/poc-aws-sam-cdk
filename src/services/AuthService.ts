import { IAuthService } from "../interfaces/IAuthService";

export class AuthService implements IAuthService {
  public extractAuthToken(event: any): string | null {
    if (!event.headers || !event.headers.Authorization) {
      console.warn("Authorization header missing");
      return null;
    }
    return event.headers.Authorization.replace("Bearer ", "");
  }
}
