// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {UsersRepository} from '../repositories';
import {JWTService} from '../services';
import {hashPassword} from '../utils';
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
    await this.UserRepository.isEmailAlreadyExists(userRegister.email_address);

    userRegister.password = await hashPassword(userRegister.password);

    const createdUser = await this.UserRepository.create(userRegister);
    return {token: await this.jwtService.generateToken(createdUser.user_uuid)};
  }
}
