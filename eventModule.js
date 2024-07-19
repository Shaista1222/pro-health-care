const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
    console.log(a, b, this);
    // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');


myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('this happens asynchronously');
    });
});
myEmitter.emit('event', 'a', 'b');