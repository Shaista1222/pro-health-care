const express = require('express');
const winston = require('winston');

const app = express();

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
        new winston.transports.File({ filename: 'app.log' }),
        new winston.transports.Http({
            host: 'logs.example.com',
            path: '/log',
            port: 3000,
            ssl: true
        })
    ]
});

app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    logger.info('Server is running on port 3000');
});
