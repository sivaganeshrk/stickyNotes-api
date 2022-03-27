import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Notes, NotesRelations, Users} from '../models';
import {generateUuid, getTimestamp} from '../utils';
import {UsersRepository} from './users.repository';

export class NotesRepository extends DefaultCrudRepository<
  Notes,
  typeof Notes.prototype.id,
  NotesRelations
> {

  public readonly owner: BelongsToAccessor<Users, typeof Notes.prototype.id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Notes, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', usersRepositoryGetter,);
  }

  definePersistedModel(entityClass: typeof Notes) {
    const modelClass = super.definePersistedModel(entityClass);
    modelClass.observe('before save', async ctx => {
      if (ctx.isNewInstance) {
        ctx.instance.created_at = getTimestamp();
        ctx.instance.note_uuid = generateUuid();
      }
    });
    return modelClass;
  }

  async createNote(note:{title:string,body:string},userId:number){
    return this.create({title:note.title,body:note.body,userId:userId})
  }

  async getNoteByUuid(uuid:string){
    return this.findOne({where:{note_uuid:uuid},fields:{userId:false}})
  }
}
