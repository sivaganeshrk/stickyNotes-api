import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(Users, dataSource);
  }

  async isEmailAlreadyExists(email_address:string){
    const result = await this.findOne({where:{email_address:email_address,deleted_at:null}})

    if(result) return true
    return false
  }
}
