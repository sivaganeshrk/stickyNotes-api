// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {UsersRepository} from '../repositories';
import {JWTService} from '../services';
import {comparePassword, ErrorHandler, hashPassword} from '../utils';
// import {inject} from '@loopback/core';

export class AuthController {
  constructor(
    @repository(UsersRepository) public UserRepository: UsersRepository,
    @inject('services.jwt.service') public jwtService: JWTService,
  ) {}

  @post('/api/v1/auth/register')
  async registerUser(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              email_address: {type: 'string', format: 'email'},
              password: {type: 'string', minLength: 8},
            },
          },
        },
      },
    })
    userRegister: {
      email_address: string;
      password: string;
    },
  ) {
    const isEmailAlreadyExists = await this.UserRepository.isEmailAlreadyExists(
      userRegister.email_address,
    );

    if (isEmailAlreadyExists) ErrorHandler.badRequest('Email Already Exists');

    userRegister.password = await hashPassword(userRegister.password);

    const createdUser = await this.UserRepository.create(userRegister);
    return {token: await this.jwtService.generateToken(createdUser.user_uuid)};
  }

  @post('/api/v1/auth/login')
  async loginUser(
    @requestBody({
      content: {},
    })
    user: {
      email_address: string;
      password: string;
    },
  ) {
    const userExists = await this.UserRepository.getUserByEmailAddress(
      user.email_address,
    );

    if (!userExists) {
      ErrorHandler.notFound('User Not Found');
      return;
    }

    const isPasswordMatch = await comparePassword(
      user.password,
      userExists.password,
    );

    if (!isPasswordMatch) ErrorHandler.unauthorized('Invalid Credentials');

    return {token: await this.jwtService.generateToken(userExists?.user_uuid)};
  }

  @get('/api/v1/auth/profile')
  async getUserProfile() {}
}
