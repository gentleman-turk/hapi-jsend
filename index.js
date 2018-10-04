'use strict';

const Hoek = require('hoek');
const Boom = require('boom');

const internals = {};

internals.blackListHttpMethods = [
    'options',
    'connect',
    'trace'
];

internals.defaults = {
    options: {
        attachHttpStatusCode: false,
        extendFailResponse: false,
        optOut: false
    }
};

/**
 * plugin.register registers the name and exposes the implementation of the plugin
 * see: http://hapijs.com/api#serverplugins for plugin format
 * @param {Object} server - the hapi server to which we are attaching the plugin
 */
exports.plugin = {
    register: (server, pluginOptions) => {

        const serverDefaults = Hoek.applyToDefaults(internals.defaults, pluginOptions);

        server.ext('onPreResponse', (request, h) => {

            if (internals.blackListHttpMethods.includes(request.method)) {
                return h.continue;
            }

            const routeSettings = request.route.settings.plugins.hapiJSend;
            const requestOptions = routeSettings ? Hoek.applyToDefaults(serverDefaults, routeSettings) : serverDefaults;

            // route configured to optOut
            if (requestOptions.optOut) {
                return h.continue;
            }

            //error responses
            if (request.response instanceof Error) {
                const err = request.response;
                /* $lab:coverage:off$ */
                // hapi appears to wrap all errors as boom so I don't know how to enter this code.
                if (!err.isBoom) {
                    Boom.boomify(err, { isJSend: true, status: 'error' });
                }
                /* $lab:coverage:on$ */
                else if (!err.isJSend) {
                    err.isJSend = true;
                    if (err.output.statusCode >= 500) {
                        err.status = 'error';
                    }
                    else {
                        err.status = 'fail';
                    }
                }

                if (err.status === 'fail') {
                    request.response.output.payload.data = {
                        error: request.response.output.payload.error,
                        message: request.response.output.payload.message
                    };
                }

                request.response.output.payload.status = err.status;
                delete request.response.output.payload.error;
                if (err.status === 'error' || requestOptions.extendFailResponse) {
                    if (err.hasOwnProperty('code')) {
                        request.response.output.payload.code = err.code;
                    }
                }
                else {
                    delete request.response.output.payload.message;
                }

                if (!requestOptions.attachHttpStatusCode) {
                    delete request.response.output.payload.statusCode;
                }

                return h.continue;
            }

            if (request.response._contentType === 'application/json') {
                const jsendPayload = Hoek.clone(request.response.source);
                request.response.source = { data: jsendPayload };
            }
            else if (typeof request.response.source === 'string') {
                request.response.source = { data: request.response.source };
            }
            else {
                return h.continue;
            }

            request.response.source.status = 'success';
            if (requestOptions.attachHttpStatusCode) {
                request.response.source.statusCode = request.response.statusCode;
            }

            return h.continue;
        });
    }
};

/**
 * attributes merely aliases the package.json (re-uses package name & version)
 * simple example: github.com/hapijs/hapi/blob/master/API.md#serverplugins
 */
exports.plugin.pkg = require('./package.json'); // hapi requires attributes for a plugin.
// also see: http://hapijs.com/tutorials/plugins

exports.JSendError = require('./lib/JSendError');
