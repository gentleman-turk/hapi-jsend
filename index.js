'use strict';

const internals = {};
/**
 * plugin.register registers the name and exposes the implementation of the plugin
 * see: http://hapijs.com/api#serverplugins for plugin format
 * @param {Object} server - the hapi server to which we are attaching the plugin
 */
exports.plugin = {
    register: (server, pluginOptions) => {

    }
};

/**
 * attributes merely aliases the package.json (re-uses package name & version)
 * simple example: github.com/hapijs/hapi/blob/master/API.md#serverplugins
 */
exports.plugin.pkg = require('./package.json'); // hapi requires attributes for a plugin.
// also see: http://hapijs.com/tutorials/plugins
