export interface IRequestService {
  extractRequestBody(event: any): Record<string, any>;
}
