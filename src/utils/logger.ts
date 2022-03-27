const log = require('simple-node-logger');
const opts = {
  errorEventName: 'logger',
  logFilePath: 'error.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
};
const logger = log.createSimpleFileLogger(opts);
logger.setLevel(process.env.NPM_CONFIG_LOGLEVEL ?? 'error');

export class Logger {
  private static payloadGenerator(module: string, msg: unknown) {
    return `Module: ${module}, msg: ${JSON.stringify(msg)}`;
  }
  static infoLogger(module: string, msg: unknown) {
    logger.info(this.payloadGenerator(module, msg));
  }

  static errorLogger(module: string, msg: unknown) {
    logger.error(this.payloadGenerator(module, msg));
  }

  static debugLogger(module: string, msg: unknown) {
    logger.debug(this.payloadGenerator(module, msg));
  }

  static warnLogger(module: string, msg: unknown) {
    logger.warn(this.payloadGenerator(module, msg));
  }

  static criticalLogger(module: string, msg: unknown) {
    logger.fatal(this.payloadGenerator(module, msg));
  }
}
