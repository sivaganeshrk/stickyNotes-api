// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, requestBody} from '@loopback/rest';
import {UsersRepository} from '../repositories';
import {ErrorHandler} from '../utils';

// import {inject} from '@loopback/core';

export class AuthController {
  constructor(
    @repository(UsersRepository) public UserRepository: UsersRepository,
  ) {}

  @get('/api/v1/auth/register')
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
    if (
      await this.UserRepository.isEmailAlreadyExists(userRegister.email_address)
    )
      ErrorHandler.badRequest('Email Already Exists');
  }
}
