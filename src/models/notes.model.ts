import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class Notes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  note_uuid: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'number',
    required: true,
  })
  created_at: number;

  @property({
    type: 'number',
  })
  updated_at?: number;

  @property({
    type: 'number',
  })
  deleted_at?: number;

  @belongsTo(() => Users, {name: 'owner'})
  userId: number;

  constructor(data?: Partial<Notes>) {
    super(data);
  }
}

export interface NotesRelations {
  // describe navigational properties here
}

export type NotesWithRelations = Notes & NotesRelations;
