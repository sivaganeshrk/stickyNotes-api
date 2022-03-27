import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Notes, NotesRelations, Users} from '../models';
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
}
