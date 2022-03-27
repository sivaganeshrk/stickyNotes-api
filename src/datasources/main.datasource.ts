import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {DataSourceConfig} from '../config';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MainDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'main';
  static readonly defaultConfig = {
    name: 'main',
    connector: 'postgresql',
    url: DataSourceConfig.getDataSourceUrl(),
    host: '',
    port: 0,
    user: '',
    password: '',
    database: '',
  };

  constructor(
    @inject('datasources.config.main', {optional: true})
    dsConfig: object = {
      name: 'main',
      connector: 'postgresql',
      url: DataSourceConfig.getDataSourceUrl(),
      host: '',
      port: 0,
      user: '',
      password: '',
      database: '',
    },
  ) {
    super(dsConfig);
  }
}
