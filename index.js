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

        internals.defaults = Hoek.applyToDefaults(internals.defaults, pluginOptions);

        server.ext('onPreResponse', (request, h) => {

            if (internals.blackListHttpMethods.contains(request.method)) {
                return h.continue;
            }

            const requestOptions = Hoek.applyToDefaults(internals.defaults, request.route.settings.plugins.hapiJSend);

            // route configured to optOut
            if (requestOptions.optOut) {
                return h.continue;
            }

            //error responses
            if (request.response instanceof Error) {
                const err = request.response;
                if (!err.isBoom) {
                    Boom.boomify(err, { isJSend: true, status: 'error' });
                }

                else if (!err.isJSend) {
                    err.isJSend = true;
                    if (err.output.statusCode >= 500) {
                        err.status = 'error';
                    }
                    else {
                        err.status = 'fail';
                    }
                }

                request.response.output.payload.status = err.status;
                if (err.status === 'error' || requestOptions.extendFailResponse) {
                    request.response.output.payload.code = err.code;
                }

                if (requestOptions.attachHttpStatusCode) {
                    request.resposne.output.payload.statusCode = err.output.statusCode;
                }

                return h.continue;
            }

            //json responses
            if (request.response instanceof Object && request.response._contentType === 'application/json') {
                const jsendPayload = Hoek.clone(request.response.source);
                request.response.source = { data: jsendPayload };
                request.response.source.status = 'success';
                request.response.source.statusCode = request.response.statusCode;
                return h.continue;
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
