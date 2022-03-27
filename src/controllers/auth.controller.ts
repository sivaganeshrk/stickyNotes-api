// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {post} from '@loopback/rest';
import {UsersRepository} from '../repositories';

// import {inject} from '@loopback/core';

export class AuthController {
  constructor(@repository(UsersRepository) UserRepository: UsersRepository) {}

  @post('/api/v1/auth/register')
  async registerUser() {}
}
