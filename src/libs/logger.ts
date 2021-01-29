import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
          })
  ),
  transports: [
    // default output all error to file
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error',
      maxsize: 2048,
      maxFiles: 10
    })
  ]
});

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  // only output console if in development
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.cli({
      all: true
    })
  }))
}

if (process.env.NODE_ENV === 'test') {
  // write every log to different file on test
  logger.add(new winston.transports.File({
    level: 'debug',
    filename: `./logs/tests/${Date.now()}.log`,
  }))
}

export default {
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger)
};
