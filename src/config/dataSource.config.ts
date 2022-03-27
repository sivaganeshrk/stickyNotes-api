export class DataSourceConfig {
  static getDataSourceUrl(): string {
    return process.env.DB_URL ?? '';
  }
}
