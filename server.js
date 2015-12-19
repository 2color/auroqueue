/**
 * Server entry point
 *  
 * requires dependencies and starts the server 
 */
var Hapi = require('hapi');

// Create a new server
const server = new Hapi.Server();

// Setup the server with a host and port
server.connection({
    port: parseInt(process.env.PORT, 10) || 3000
});

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
                events: { log: '*', response: '*' }
            }]
        }
    }, {
        // static file serving support for hapi.js
        register: require('inert'),
    }, {
        register: require('./server/routes.js')
    }
], () => {
    server.start( () => console.log('Server started at: ' + server.info.uri) );
});


// Export the server to be required elsewhere (testing using)
module.exports = server;