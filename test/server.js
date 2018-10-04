'use strict';
/* $lab:coverage:off$ */
const Boom = require('boom');
const Hapi = require('hapi');
const JSendError = require('../lib/JSendError');


// initialize the Hapi Server instance
const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

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
                case 'boom':
                    throw Boom.unauthorized('Not allowed');
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
    method: 'POST',
    options: {
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
    }
});

server.route({
    path: '/optOut/{condition}',
    method: 'POST',
    options: {
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
    }
});

server.route({
    path: '/string',
    method: '*',
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

server.route({
    path: '/array',
    method: 'POST',
    handler: async (request, h) => {
        return [{ message: 'success' }];
    }
});

server.route({
    path: '/buffer',
    method: 'POST',
    handler: async (request, h) => {
        return Buffer.from("success");
    }
});

const init = async () => {
    await server.register(require('../index'));
};

init();

// used for testing
module.exports = server;

/* $lab:coverage:on$ */
