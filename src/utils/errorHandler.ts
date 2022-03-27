import {HttpErrors} from '@loopback/rest';

export class ErrorHandler {
  constructor(code = 400, message: string) {
    throw new HttpErrors[code](message);
  }

  private static handleError(code: number, message: string) {
    throw new HttpErrors[code](message);
  }

  static unauthorized(message = 'Unauthorized User') {
    return this.handleError(401, message);
  }

  static internalServerError() {
    return this.handleError(
      500,
      'Something Went wrong, please try again later',
    );
  }

  static badRequest(message: string) {
    return this.handleError(400, message);
  }
}
