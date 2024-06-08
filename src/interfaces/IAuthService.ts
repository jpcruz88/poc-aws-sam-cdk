export interface IAuthService {
  extractAuthToken(event: any): string | null;
}
