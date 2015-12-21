/**
 * Server Routes
 * 
 * Implemented as a hapi.js server plugin
 */
const state = require('./state');


exports.register = function(server, options, next){

    server.route([
         {
            method: 'GET',
            path: '/',
            config: {
                handler: {
                    file: './public/index.html'
                }
            }
        }, {
            method: 'GET',
            path: '/public/{path*}',            
            handler: {
                directory: { path: './public' }
            }
        },
        {
            method: 'GET',
            path: '/api/desks',            
            handler: (request, reply) => {
                reply(state.getDesks());
            }
        },
        {
            method: 'GET',
            path: '/api/advance/{desk}',            
            handler: (request, reply) => {
                state.advanceToken(request.params.desk);
                reply(state.getDesks());
            }
        },
        {
            method: 'GET',
            path: '/api/token',            
            handler: (request, reply) => {
                reply(state.getNewToken());
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'routes'
};