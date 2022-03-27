import {JwtPayload, sign, verify} from 'jsonwebtoken';
import {JwtConfig} from '../config';
import {ErrorHandler} from '../utils/errorHandler';
import {Logger} from '../utils/logger';
require('dotenv').config();
export class JWTService {
  async generateToken(user_uuid: string) {
    try {
      const payload = {
        user: {
          user_uuid: user_uuid,
        },
      };
      const token = sign(payload, JwtConfig.getSecret(), {
        expiresIn: JwtConfig.getExpireTime(),
      });

      return token;
    } catch (err) {
      Logger.errorLogger('JWTService GenerateToken', err);
      return ErrorHandler.internalServerError();
    }
  }

  async verifyToken(token: string) {
    try {
      if (!token)
        return new ErrorHandler(401, 'Authorization header is missing');

      const decoded = <JwtPayload>verify(token, JwtConfig.getSecret());

      return decoded.user;
    } catch (err) {
      return ErrorHandler.unauthorized('Invalid token');
    }
  }
}
