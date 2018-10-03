'use strict';
/* $lab:coverage:off$ */
const Hapi = require('hapi');


// initialize the Hapi Server instance
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register(require('../index'));

    server.route({
        path: '/attachHttpStatusCode/{condition}',
        method: '*',
        handler: async (request, h) => {
            switch (request.params.condition) {
                case 'fail':
                    throw new Error('fail');
                case 'error':
                    throw new Error('error');
                case 'success':
                    break;
            }
        }
    });
};

init();

// used for testing
module.exports = server;

/* $lab:coverage:on$ */
