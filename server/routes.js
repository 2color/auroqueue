/**
 * Server Routes
 * 
 * Implemented as a hapi.js server plugin
 */
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
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'routes'
};