import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Request, Response, RestBindings} from '@loopback/rest';
import {JWTService} from '../services';
import {ErrorHandler} from '../utils';

require('dotenv').config();

export class JWTStrategy implements AuthenticationStrategy {
  constructor(
    @inject(RestBindings.Http.RESPONSE) public response: Response,
    @inject('services.jwt.service') public jwtService: JWTService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  name: string = 'jwt';
  async authenticate(request: Request) {
    const user = await this.jwtService.verifyToken(
      this.extractCredentials(request),
    );
    return user;
  }
  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      ErrorHandler.unauthorized('Authorization header is missing');
      return '';
    }

    const authHeadervalue = request.headers.authorization;

    return authHeadervalue;
  }
}
