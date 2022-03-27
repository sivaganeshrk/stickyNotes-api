import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';
import {generateUuid, getTimestamp} from '../utils';

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

  definePersistedModel(entityClass: typeof Users) {
    const modelClass = super.definePersistedModel(entityClass);
    modelClass.observe('before save', async ctx => {
      if (ctx.isNewInstance) {
        ctx.instance.created_at = getTimestamp();
        ctx.instance.user_uuid = generateUuid();
      }
    });
    return modelClass;
  }

  async isEmailAlreadyExists(email_address:string){
    const result = await this.findOne({where:{email_address:email_address,deleted_at:null}})

    if(result) return true
    return false
  }

  async getUserByEmailAddress(email_address:string){
    return this.findOne({where:{email_address:email_address,deleted_at:null}})
  }

  async getUserByUuidForAuth(user_uuid:string){
    return this.findOne({where:{user_uuid:user_uuid,deleted_at:null},fields:{password:false,deleted_at:false}})
  }
}
