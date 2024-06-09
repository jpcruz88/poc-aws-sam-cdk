import { IAuthService } from "../interfaces/IAuthService";

export class AuthService implements IAuthService {
  public extractAuthToken(event: any): string | null {
    if (!event.headers.Authorization) {
      return null;
    }
    return event.headers.Authorization.replace("Bearer ", "");
  }
}
