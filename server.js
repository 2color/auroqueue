/**
 * Server entry point
 *  
 * requires dependencies and starts the server 
 */
var Hapi = require('hapi');
var state = require('./server/state');

var config = { connections: { router: { stripTrailingSlash: true } } };

// Create a new server
const server = new Hapi.Server(config);

// Setup the server with a host and port
server.connection({
    port: parseInt(process.env.PORT, 10) || 8000,
    routes: { log: true }
});

/**
 * Socket.io setup
 */
var io = require("socket.io")(server.listener);
server.app.io = io;

io.on("connection", function (socket) {
    // server.log('connected', { woot: "log data object"});
    socket.emit("state", state.getState());
})


/**
 * Load all plugins and then start the server.
 * First: community/npm plugins are loaded
 * Second: project specific plugins are loaded
 */
server.register([
    {
        register: require("good"),
        options: {
            opsInterval: 5000,
            reporters: [{
                reporter: require('good-console'),
                events: { log: '*', response: '*' },
                config: {
                    format: 'YY/MM/DD HH:mm:ss'
                }
            }]
        }
    }, {
        // static file serving support for hapi.js
        register: require('inert'),
    }, {
        register: require('./server/routes')
    }
], () => {
    server.start( () => server.log([], 'Server started at: ' + server.info.uri) );
});


// Export the server to be required elsewhere (testing using)
module.exports = server;
