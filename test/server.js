'use strict';
/* $lab:coverage:off$ */
const Hapi = require('hapi');
const JSendError = require('../lib/JSendError');


// initialize the Hapi Server instance
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register(require('../index'));

    server.route({
        path: '/attachHttpStatusCode/{condition}',
        method: 'POST',
        options: {
            plugins: {
                hapiJSend: {
                    attachHttpStatusCode: true
                }
            },
            handler: async (request, h) => {
                switch (request.params.condition) {
                    case 'fail':
                        throw new JSendError('fail', 400, 1);
                    case 'error':
                        throw new Error('error');
                    case 'success':
                        return 'success';
                }
            }
        }
    });

    server.route({
        path: '/extendFailResponse/{condition}',
        method: '*',
        plugins: {
            hapiJSend: {
                extendFailResponse: true
            }
        },
        handler: async (request, h) => {
            switch (request.params.condition) {
                case 'fail':
                    throw new JSendError('fail', 400, 1);
                case 'error':
                    throw new Error('error');
                case 'success':
                    return 'success';
            }
        }
    });

    server.route({
        path: '/optOut/{condition}',
        method: '*',
        plugins: {
            hapiJSend: {
                optOut: true
            }
        },
        handler: async (request, h) => {
            switch (request.params.condition) {
                case 'fail':
                    throw new JSendError('fail', 400, 1);
                case 'error':
                    throw new Error('error');
                case 'success':
                    return 'success';
            }
        }
    });

    server.route({
        path: '/string',
        method: 'POST',
        handler: async (request, h) => {
            return 'success';
        }
    });

    server.route({
        path: '/json',
        method: 'POST',
        handler: async (request, h) => {
            return { message: 'success' };
        }
    });
};

init();

// used for testing
module.exports = server;

/* $lab:coverage:on$ */
