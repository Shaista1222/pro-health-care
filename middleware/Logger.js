const winston=require('winston')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logger.log' }),
        new winston.transports.Http({
            host: 'logs.example.com',
            path: '/log',
            port: 3000,
            ssl: true
        })

    ]
});

module.exports = logger;