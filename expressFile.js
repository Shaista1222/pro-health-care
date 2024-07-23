// const express = require('express');
// const http = require("http");
// const app = express();
//
// app.get('/', (req, res) => {
//    res.send('Hello World!')
// })
// app.get('/PatientProfile.json', (req, res) => {
//     res.send('Employees data!')
// })
// //app is an instance of express
//
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

///////////////
// const express = require('express')
// const router = express.Router()
//
// // middleware that is specific to this router
// const timeLog = (req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// }
// router.use(timeLog)
//
// // define the home page route
// router.get('/', (req, res) => {
//     res.send('Birds home page')
// })
// // define the about route
// router.get('/about', (req, res) => {
//     res.send('About birds')
// })
//
// module.exports = router
////////////////////////////
// const express = require('express');
// const winston = require('winston');
//
// // Create a new Express application instance
// const app = express();
//
// // Set up Winston logger
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.printf(({ timestamp, level, message }) => {
//             return `${timestamp} ${level}: ${message}`;
//         })
//     ),
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: 'app.log' })
//     ]
// });
//
// // Middleware to log all incoming requests
// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.url}`);
//     next();
// });
//
// // Define routes
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });
//
// // Error handling middleware
// app.use((err, req, res, next) => {
//     logger.error(err.message);
//     res.status(500).send('Something went wrong!');
// });
//
// // Start the server
// app.listen(3000, () => {
//     logger.info('Server is running on port 3000');
// });
/////////////////////////////
//Object validation
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(0).required(),
    email: Joi.string().email().required()
});

const data = {
    name: 'John Doe',
    age: 25,
    email: 'john.doe@example.com'
};

const { error, value } = schema.validate(data);

if (error) {
    console.error(error.details);
} else {
    console.log('Valid data:', value);
}

////////////////////////////
//Array validation
const arraySchema = Joi.array().items(
    Joi.object({
        name: Joi.string().required(),
        age: Joi.number().integer().min(0).required()
    })
);

const arrayData = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Doe', age: 30 }
];

const { error, value } = arraySchema.validate(arrayData);

if (error) {
    console.error(error.details);
} else {
    console.log('Valid data:', value);
}
//Custom Validation
const customSchema = Joi.string().custom((value, helpers) => {
    if (value !== 'validValue') {
        return helpers.message('Custom validation error: value must be "validValue"');
    }
    return value; // Return the value if valid
}, 'Custom validation description');

const customData = 'invalidValue';

const { error, value } = customSchema.validate(customData);

if (error) {
    console.error(error.details);
} else {
    console.log('Valid data:', value);
}
//Joi with express ---
const express = require('express');
// const Joi = require('joi');

const app = express();
app.use(express.json());

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(0).required(),
    email: Joi.string().email().required()
});

app.post('/users', (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    res.send('User data is valid');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
//Nested Objects and array--------
const nestedSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().required(),
        age: Joi.number().integer().min(0).required()
    }),
    orders: Joi.array().items(
        Joi.object({
            id: Joi.number().integer().required(),
            amount: Joi.number().positive().required()
        })
    )
});

const nestedData = {
    user: {
        name: 'John Doe',
        age: 25
    },
    orders: [
        { id: 1, amount: 100 },
        { id: 2, amount: 200 }
    ]
};

const { error, value } = nestedSchema.validate(nestedData);

if (error) {
    console.error(error.details);
} else {
    console.log('Valid data:', value);
}
