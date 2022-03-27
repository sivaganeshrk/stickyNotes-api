// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {User} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, param, post, put, requestBody} from '@loopback/rest';
import {NotesRepository} from '../repositories';
import {
  limitSchema,
  orderBySchema,
  pageSchema,
  sortBySchema,
  uuidSchema,
} from '../schema';
import {ErrorHandler, getTimestamp} from '../utils';
import {stringNumberAndSomeSpecialValidation} from '../validation';

// import {inject} from '@loopback/core';
@authenticate('jwt')
export class NotesController {
  constructor(
    @repository(NotesRepository) public notesRepository: NotesRepository,
    @inject(AuthenticationBindings.CURRENT_USER) public user: User,
  ) {}

  @post('/api/v1/note')
  async createNotes(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title'],
            additionalProperties: false,
            properties: {
              title: {
                type: 'string',
                format: stringNumberAndSomeSpecialValidation.name,
              },
              body: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    note: {
      title: string;
      body: string;
    },
  ) {
    const createdNote = await this.notesRepository.createNote(
      note,
      this.user.getId(),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete createdNote.userId;
    delete createdNote.id;
    return createdNote;
  }

  @put('/api/v1/note')
  async updateNotes(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              title: {
                type: 'string',
                format: stringNumberAndSomeSpecialValidation.name,
              },
              body: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    note: Partial<{title: string; body: string}>,
    @param.query.string('note_uuid', uuidSchema('node_uuid')) note_uuid: string,
  ) {
    const updateFiled: {[key: string]: string} = {};

    if (note.title) updateFiled.title = note.title;
    if (note.body) updateFiled.body = note.body;

    const noteExists = await this.notesRepository.getNoteByUuid(note_uuid);

    if (!noteExists) {
      ErrorHandler.notFound('Note not found');
      return;
    }

    await this.notesRepository.updateById(noteExists.id, {
      ...updateFiled,
      updated_at: getTimestamp(),
    });

    return;
  }

  @get('/api/v1/note')
  async getNote(
    @param.query.string('note_uuid', uuidSchema('node_uuid')) note_uuid: string,
  ) {
    const noteExists = await this.notesRepository.getNoteByUuid(note_uuid);

    if (!noteExists) {
      ErrorHandler.notFound('Note not found');
      return;
    }

    delete noteExists.id;
    return noteExists;
  }

  @del('/api/v1/note')
  async deleteNode(
    @param.query.string('note_uuid', uuidSchema('node_uuid')) note_uuid: string,
  ) {
    const noteExists = await this.notesRepository.getNoteByUuid(note_uuid);

    if (!noteExists) {
      ErrorHandler.notFound('Note not found');
      return;
    }

    await this.notesRepository.deleteById(noteExists.id);

    return;
  }

  @get('/api/v1/notes')
  async getAllNotes(
    @param.query.integer('page', pageSchema) page: number,

    @param.query.integer('limit', limitSchema) limit: number,

    @param.query.string('sortBy', sortBySchema)
    sortBy: string,

    @param.query.string('orderBy', orderBySchema) orderBy: number,
  ) {
    if (page === undefined) {
      page = 1;
    }
    if (limit === undefined) {
      limit = 25;
    }
    let sortBy_array = '';

    if (sortBy === undefined) {
      sortBy_array += `id ${orderBy === 1 ? 'DESC' : 'ASC'}`;
    } else if (sortBy === 'created_at' || sortBy === 'updated_at') {
      sortBy_array += `id ${orderBy === 1 ? 'DESC' : 'ASC'},`;
      sortBy_array += `${sortBy} ${orderBy === 1 ? 'DESC' : 'ASC'}`;
    } else {
      sortBy_array += `${sortBy} ${orderBy === 1 ? 'DESC' : 'ASC'}`;
    }
    const count = await this.notesRepository.count({
      userId: this.user.id,
      deleted_at: null,
    });

    const notes = await this.notesRepository.find({
      where: {userId: this.user.getId(), deleted_at: null},
      limit: limit,
      offset: limit - limit * page,
      order: [sortBy_array],
    });

    return {
      pagination: {
        limit,
        page,
        last_page: Math.ceil(count.count / limit),
      },
      result: notes,
    };
  }
}
