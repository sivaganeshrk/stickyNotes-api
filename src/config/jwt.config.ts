export class JwtConfig {
  static getSecret(): string {
    return process.env.JWT_SECRET ?? '';
  }

  static getExpireTime(): string {
    return process.env.USER_REGISTER_JWT_EXPIRES_TIME ?? '30d';
  }
}
