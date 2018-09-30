'use strict';

const internals = {};

internals.blackListHttpMethods = [
    'options',
    'connect',
    'trace'
];

internals.appendHttpStatusCode = {};

var pluginOptionsTemplate = {
    options: {
        attachHttpStatusCode: true,
        extendErrorResponse: true
    }
};

/**
 * plugin.register registers the name and exposes the implementation of the plugin
 * see: http://hapijs.com/api#serverplugins for plugin format
 * @param {Object} server - the hapi server to which we are attaching the plugin
 */
exports.plugin = {
    register: (server, pluginOptions) => {

        server.ext('onPreResponse', (request, h) => {

            if (internals.blackListHttpMethods.contains(request.method)) {
                return h.continue;
            }

            // Handle Proxy Responses
            if (request.response.variety === 'stream') {
                return h.continue;
            }

            // route configured to optOut
            if (request.route.settings.plugins.hapiJSend.optOut) {
                return h.continue;
            }
        });
    }
};

/**
 * attributes merely aliases the package.json (re-uses package name & version)
 * simple example: github.com/hapijs/hapi/blob/master/API.md#serverplugins
 */
exports.plugin.pkg = require('./package.json'); // hapi requires attributes for a plugin.
// also see: http://hapijs.com/tutorials/plugins
