export class JsonResponse {
  response = {};
  message = '';
  status = true;

  constructor(response: any, message: string, status: boolean = true) {
    this.response = response;
    this.message = message;
    this.status = status;
  }
  json() {
    const response = this.response;
    return JSON.stringify({
      message: this.message,
      data: response,
      status: this.status,
    });
  }
}
