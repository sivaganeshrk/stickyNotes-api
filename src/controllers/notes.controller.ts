// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {NotesRepository} from '../repositories';

// import {inject} from '@loopback/core';
@authenticate('jwt')
export class NotesController {
  constructor(
    @repository(NotesRepository) public notesRepository: NotesRepository,
    @inject(AuthenticationBindings.CURRENT_USER) user: {user_uuid: string},
  ) {}

  @post('/api/v1/note')
  async createNotes(
    @requestBody({
      content:{
        'application/json':{
          schema:{
            type:'object',
            additionalProperties:false,
            properties:{
              title
            }
          }
        }
      }
    }) note:{}
  ){}
}
