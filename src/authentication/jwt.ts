import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Request, Response, RestBindings} from '@loopback/rest';
import {UsersRepository} from '../repositories';
import {JWTService} from '../services';
import {ErrorHandler} from '../utils';

require('dotenv').config();

export class JWTStrategy implements AuthenticationStrategy {
  constructor(
    @inject(RestBindings.Http.RESPONSE) public response: Response,
    @repository(UsersRepository) public userRepository: UsersRepository,
    @inject('services.jwt.service') public jwtService: JWTService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  name: string = 'jwt';
  async authenticate(request: Request) {
    const userIdentifier = await this.jwtService.verifyToken(
      this.extractCredentials(request),
    );

    const userExists = await this.userRepository.getUserByUuidForAuth(
      userIdentifier.user_uuid,
    );

    if (!userExists) ErrorHandler.unauthorized('User Not Found');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return userExists as any;
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
